using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;
using BarbershopBooking.Infrastructure.Identity.Entities;

namespace BarbershopBooking.Infrastructure.Identity.Jwt.Interfaces
{
    internal interface IJwtService
    {
        Task<AuthToken> GenerateJwtForUser(ApplicationUser user);
        Task<ResultWithData<AuthToken>> RefreshTokenAsync(string token, string refreshToken);
    }
}