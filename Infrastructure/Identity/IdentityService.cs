using BarbershopBooking.Application.Common.Interfaces;
using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;
using BarbershopBooking.Infrastructure.Identity.Entities;
using BarbershopBooking.Infrastructure.Identity.Jwt.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BarbershopBooking.Infrastructure.Identity;

internal class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly IAuthorizationService _authorizationService;
    private readonly IJwtService _jwtService;

    public IdentityService(UserManager<ApplicationUser> userManager, IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory, IAuthorizationService authorizationService, IJwtService jwtService)
    {
        _userManager = userManager;
        _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        _authorizationService = authorizationService;
        _jwtService = jwtService;
    }

    public async Task<string> GetUserNameAsync(string userId)
    {
        var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

        return user.UserName;
    }

    public async Task<(Result Result, string? UserId)> CreateUserAsync(CreateCustomerDto userData)
    {
        var result = await CreateCustomerWithIdentityAsync(userData);
        var user = result.User;
        return (result.Result, user?.Id);
    }

    private async Task<(Result Result, ApplicationUser? User)> CreateCustomerWithIdentityAsync(CreateCustomerDto userData)
    {
        var (firstName,
            lastName,
            email,
            dateOfBirth,
            phoneNumber,
            city,
            password) = userData;
        var user = new ApplicationUser
        {
            UserName = email + "_" + Guid.NewGuid(),
            Email = email,
            FirstName = firstName,
            LastName = lastName,
            DateOfBirth = dateOfBirth,
            PhoneNumber = phoneNumber,
            City = city
        };

        var result = await _userManager.CreateAsync(user, password);
        return (result.ToApplicationResult(), result.Succeeded ? user : null);
    }

    public async Task<ResultWithData<AuthToken>> RegisterCustomerAsync(CreateCustomerDto userData)
    {
        var (result, user) = await CreateCustomerWithIdentityAsync(userData);
        return result.Succeeded ? ResultWithData<AuthToken>.Success(await _jwtService.GenerateJwtForUser(user)) : ResultWithData<AuthToken>.Failure(result.Errors);
    }

    public async Task<ResultWithData<AuthToken>> RegisterBarbershopAsync(CreateCustomerDto userData)
    {
        var (result, user) = await CreateCustomerWithIdentityAsync(userData);
        return result.Succeeded ? ResultWithData<AuthToken>.Success(await _jwtService.GenerateJwtForUser(user)) : ResultWithData<AuthToken>.Failure(result.Errors);
    }

    public async Task<bool> IsInRoleAsync(string userId, string role)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);
        return user != null && await _userManager.IsInRoleAsync(user, role);
    }

    public async Task<bool> AuthorizeAsync(string userId, string policyName)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);
        if (user is null)
            return false;

        var principle = await _userClaimsPrincipalFactory.CreateAsync(user);
        var result = await _authorizationService.AuthorizeAsync(principle, policyName);
        return result.Succeeded;
    }
    
    public async Task<ResultWithData<AuthToken>> AuthenticateAsync(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            return ResultWithData<AuthToken>.Failure(new[] { "Invalid username or password." });

        var isValidPassword = await _userManager.CheckPasswordAsync(user, password);

        if (!isValidPassword)
            return ResultWithData<AuthToken>.Failure(new[] { "Invalid username or password." });

        return ResultWithData<AuthToken>.Success(await _jwtService.GenerateJwtForUser(user));
    }

    public async Task<ResultWithData<AuthToken>> RefreshTokenAsync(string token, string refreshToken) 
        => await _jwtService.RefreshTokenAsync(token, refreshToken);
}
