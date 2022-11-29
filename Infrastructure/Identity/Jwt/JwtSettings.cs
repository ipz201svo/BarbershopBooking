namespace BarbershopBooking.Infrastructure.Identity.Jwt;

internal class JwtSettings
{
    public string Secret { get; set; }

    public TimeSpan TokenLifetime { get; set; }
    
    public TimeSpan RefreshTokenLifetime { get; set; }
}
