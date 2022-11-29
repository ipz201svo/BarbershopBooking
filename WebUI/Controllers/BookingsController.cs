using BarbershopBooking.Application.Bookings.Queries.GetBookings;
using BarbershopBooking.Application.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace BarbershopBooking.WebUI.Controllers;

public class BookingsController : ApiControllerBase
{
    //[HttpGet]
    //public async Task<PaginatedList<BookingDto>> GetBookings([FromQuery] GetBookingsWithPaginationQuery query)
    //{
    //    return await Mediator.Send(query);
    //}

    public JsonResult GetBookings([FromQuery] GetBookingsWithPaginationQuery query)
    {
        var list = new BookingDto[] { new BookingDto(Id: 1,
                BarberName: "Barber 1",
                StartDate: new DateTime(2021, 1, 1, 12, 0, 0),
                EndDate: new DateTime(2021, 1, 1, 13, 0, 0),
                Barbershop: new BarbershopDto(1, "Barbershop 1"),
                Services: new ServiceDto[] { new ServiceDto(1, "Service 1"), new ServiceDto(2, "Service 2") },
                Status: "Pending"),
            new BookingDto(Id: 2,
                BarberName: "Barber 1",
                StartDate: new DateTime(2021, 1, 1, 12, 0, 0),
                EndDate: new DateTime(2021, 1, 1, 13, 0, 0),
                Barbershop: new BarbershopDto(1, "Barbershop 1"),
                Services: new ServiceDto[] { new ServiceDto(1, "Service 1"), new ServiceDto(2, "Service 2") },
                Status: "Pending"),
            new BookingDto(Id: 3,
                BarberName: "Barber 1",
                StartDate: new DateTime(2021, 1, 1, 12, 0, 0),
                EndDate: new DateTime(2021, 1, 1, 13, 0, 0),
                Barbershop: new BarbershopDto(1, "Barbershop 1"),
                Services: new ServiceDto[] { new ServiceDto(1, "Service 1"), new ServiceDto(2, "Service 2") },
                Status: "Pending"),
            new BookingDto(Id: 4,
                BarberName: "Barber 1",
                StartDate: new DateTime(2021, 1, 1, 12, 0, 0),
                EndDate: new DateTime(2021, 1, 1, 13, 0, 0),
                Barbershop: new BarbershopDto(1, "Barbershop 1"),
                Services: new ServiceDto[] { new ServiceDto(1, "Service 1"), new ServiceDto(2, "Service 2") },
                Status: "Pending"),
            new BookingDto(Id: 5,
                BarberName: "Barber 1",
                StartDate: new DateTime(2021, 1, 1, 12, 0, 0),
                EndDate: new DateTime(2021, 1, 1, 13, 0, 0),
                Barbershop: new BarbershopDto(1, "Barbershop 1"),
                Services: new ServiceDto[] { new ServiceDto(1, "Service 1"), new ServiceDto(2, "Service 2") },
                Status: "Pending"),
            new BookingDto(Id: 6,
                BarberName: "Barber 1",
                StartDate: new DateTime(2021, 1, 1, 12, 0, 0),
                EndDate: new DateTime(2021, 1, 1, 13, 0, 0),
                Barbershop: new BarbershopDto(1, "Barbershop 1"),
                Services: new ServiceDto[] { new ServiceDto(1, "Service 1"), new ServiceDto(2, "Service 2") },
                Status: "Pending"),
            new BookingDto(Id: 7,
                BarberName: "Barber 1",
                StartDate: new DateTime(2021, 1, 1, 12, 0, 0),
                EndDate: new DateTime(2021, 1, 1, 13, 0, 0),
                Barbershop: new BarbershopDto(1, "Barbershop 1"),
                Services: new ServiceDto[] { new ServiceDto(1, "Service 1"), new ServiceDto(2, "Service 2") },
                Status: "Pending"),
            new BookingDto(Id: 8,
                BarberName: "Barber 1",
                StartDate: new DateTime(2021, 1, 1, 12, 0, 0),
                EndDate: new DateTime(2021, 1, 1, 13, 0, 0),
                Barbershop: new BarbershopDto(1, "Barbershop 1"),
                Services: new ServiceDto[] { new ServiceDto(1, "Service 1"), new ServiceDto(2, "Service 2") },
                Status: "Pending"),
            new BookingDto(Id: 9,
                BarberName: "Barber 1",
                StartDate: new DateTime(2021, 1, 1, 12, 0, 0),
                EndDate: new DateTime(2021, 1, 1, 13, 0, 0),
                Barbershop: new BarbershopDto(1, "Barbershop 1"),
                Services: new ServiceDto[] { new ServiceDto(1, "Service 1"), new ServiceDto(2, "Service 2") },
                Status: "Pending"),
            new BookingDto(Id: 10,
                BarberName: "Barber 1",
                StartDate: new DateTime(2021, 1, 1, 12, 0, 0),
                EndDate: new DateTime(2021, 1, 1, 13, 0, 0),
                Barbershop: new BarbershopDto(1, "Barbershop 1"),
                Services: new ServiceDto[] { new ServiceDto(1, "Service 1"), new ServiceDto(2, "Service 2") },
                Status: "Pending"),
            new BookingDto(Id: 11,
                BarberName: "Barber 1",
                StartDate: new DateTime(2021, 1, 1, 12, 0, 0),
                EndDate: new DateTime(2021, 1, 1, 13, 0, 0),
                Barbershop: new BarbershopDto(1, "Barbershop 1"),
                Services: new ServiceDto[] { new ServiceDto(1, "Service 1"), new ServiceDto(2, "Service 2") },
                Status: "Pending"),};
        return new JsonResult(new
        {
            pageNumber = query.Page,
            totalPages = Math.Ceiling((double)list.Length / query.Size),
            totalCount = list.Length,
            items = list.Skip((query.Page - 1) * query.Size).Take(query.Size).ToArray()
        });
    }
}
