using Microsoft.AspNetCore.Identity;

namespace BarbershopBooking.Infrastructure.Identity.Entities;

public class ApplicationUser : IdentityUser
{
    [PersonalData]
    public string FirstName { get; set; }

    [PersonalData]
    public string LastName { get; set; }

    [PersonalData]
    public DateTime DateOfBirth { get; set; }

    [PersonalData]
    public string City { get; set; }
}
