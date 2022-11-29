using BarbershopBooking.Application.Common.Models;
using MediatR;

namespace BarbershopBooking.Application.Bookings.Queries.GetBookings;

internal class GetBookingsWithPaginationQueryHandler 
    : IRequestHandler<GetBookingsWithPaginationQuery, PaginatedList<BookingDto>>
{
    public Task<PaginatedList<BookingDto>> Handle(GetBookingsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(new PaginatedList<BookingDto>(new List<BookingDto>(), 0, 0, 0));
    }
}
