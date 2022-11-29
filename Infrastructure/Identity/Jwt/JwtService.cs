using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;
using BarbershopBooking.Infrastructure.Identity.Entities;
using BarbershopBooking.Infrastructure.Identity.Jwt.Interfaces;
using BarbershopBooking.Infrastructure.Persistence;
using BarbershopBooking.Infrastructure.Persistence.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BarbershopBooking.Infrastructure.Identity.Jwt;

internal class JwtService : IJwtService
{
    private readonly JwtSettings _jwtSettings;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly TokenValidationParameters _tokenValidationParameters;

    public JwtService(IOptions<JwtSettings> jwtSettings, ApplicationDbContext context, UserManager<ApplicationUser> userManager, TokenValidationParameters tokenValidationParameters)
    {
        _jwtSettings = jwtSettings.Value;
        _context = context;
        _userManager = userManager;
        _tokenValidationParameters = tokenValidationParameters;
    }

    public async Task<AuthToken> GenerateJwtForUser(ApplicationUser user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("id", user.Id),
            }),
            Expires = DateTime.UtcNow.Add(_jwtSettings.TokenLifetime),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);
        var refreshToken = new RefreshToken
        {
            JwtId = token.Id,
            UserId = user.Id,
            CreationDate = DateTime.UtcNow,
            ExpiryDate = DateTime.UtcNow.Add(_jwtSettings.RefreshTokenLifetime),
            Token = jwtToken
        };

        await _context.RefreshTokens.AddAsync(refreshToken);
        await _context.SaveChangesAsync();
        return new AuthToken(jwtToken, refreshToken.Token);
    }

    public async Task<ResultWithData<AuthToken>> RefreshTokenAsync(string token, string refreshToken)
    {
        var validateedToken = GetPrincipalFromExpiredToken(token);
        if (validateedToken == null)
            return GenerateInvalidTokenResult();

        var expiryDateUnix = long.Parse(validateedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
        var expiryDateTimeUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            .AddSeconds(expiryDateUnix);

        if (expiryDateTimeUtc > DateTime.UtcNow)
            return GenerateInvalidTokenResult();

        var storedRefreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == refreshToken);
        var jti = validateedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

        if (storedRefreshToken == null
            || DateTime.UtcNow > storedRefreshToken.ExpiryDate
            || storedRefreshToken.Invalidated
            || storedRefreshToken.Used
            || storedRefreshToken.JwtId != jti)
            return GenerateInvalidTokenResult();

        storedRefreshToken.Used = true;
        _context.RefreshTokens.Update(storedRefreshToken);
        await _context.SaveChangesAsync();

        var dbUser = await _userManager.FindByIdAsync(validateedToken.Claims.Single(x => x.Type == "id").Value);
        return ResultWithData<AuthToken>.Success(await GenerateJwtForUser(dbUser));
    }

    private static ResultWithData<AuthToken> GenerateInvalidTokenResult()
    {
        return ResultWithData<AuthToken>.Failure(new[] { "Invalid token." });
    }

    private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            var principal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out var validatedToken);
            if (!IsJwtWithValidSecurityAlgorithm(validatedToken))
                return null;

            return principal;
        }
        catch
        {
            return null;
        }
    }

    private static bool IsJwtWithValidSecurityAlgorithm(SecurityToken validatedToken) =>
        (validatedToken is JwtSecurityToken jwtSecurityToken) &&
            jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase);
}
