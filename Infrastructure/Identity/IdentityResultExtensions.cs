using BarbershopBooking.Application.Common.Models;
using Microsoft.AspNetCore.Identity;

namespace BarbershopBooking.Infrastructure.Identity;

public static class IdentityResultExtensions
{
    public static Result ToApplicationResult(this IdentityResult result) => 
        result.Succeeded 
            ? Result.Success() 
            : Result.Failure(result.Errors.Select(e => e.Description));
}
