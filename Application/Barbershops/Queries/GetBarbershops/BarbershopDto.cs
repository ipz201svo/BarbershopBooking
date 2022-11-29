namespace BarbershopBooking.Application.Barbershops.Queries.GetBarbershops;

public record BarbershopDto(int Id, string Name, string Address, string Image, double Rating, int ReviewsCount);
