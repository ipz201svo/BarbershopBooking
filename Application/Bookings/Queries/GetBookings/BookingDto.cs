namespace BarbershopBooking.Application.Bookings.Queries.GetBookings;

public record BookingDto(
    int Id, 
    string BarberName, 
    DateTime StartDate, 
    DateTime EndDate, 
    BarbershopDto Barbershop,
    ServiceDto[] Services,
    string Status);
