using BarbershopBooking.Application.Common.Models;
using MediatR;

namespace BarbershopBooking.Application.Bookings.Queries.GetBookings;

public record GetBookingsWithPaginationQuery: IRequest<PaginatedList<BookingDto>>
{
    public int Page { get; set; } = 1;
    public int Size { get; set; } = 10;
    public List<string> SortBy { get; set; } = new();
}
