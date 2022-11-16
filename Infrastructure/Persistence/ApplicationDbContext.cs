using BarbershopBooking.Infrastructure.Identity.Entities;
using BarbershopBooking.Infrastructure.Persistence.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BarbershopBooking.Infrastructure.Persistence;

public class ApplicationDbContext: IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<RefreshToken> RefreshTokens { get; set; }
}
