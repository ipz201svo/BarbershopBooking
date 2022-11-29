using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;

namespace BarbershopBooking.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<string> GetUserNameAsync(string userId);

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<(Result Result, string? UserId)> CreateUserAsync(CreateCustomerDto userData);
    
    Task<ResultWithData<AuthToken>> AuthenticateAsync(string email, string password);
    
    Task<ResultWithData<AuthToken>> RegisterCustomerAsync(CreateCustomerDto userData);
    
    Task<ResultWithData<AuthToken>> RefreshTokenAsync(string token, string refreshToken);
}
