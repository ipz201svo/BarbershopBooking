using BarbershopBooking.Infrastructure.Identity.Entities;

namespace BarbershopBooking.Infrastructure.Persistence.Entities;

public class RefreshToken
{
    public int Id { get; set; }

    public string Token { get; set; }

    public string JwtId { get; set; }

    public DateTime CreationDate { get; set; }

    public DateTime ExpiryDate { get; set; }

    public bool Used { get; set; }

    public bool Invalidated { get; set; }

    public ApplicationUser User { get; set; }
    
    public string UserId { get; set; }
}
