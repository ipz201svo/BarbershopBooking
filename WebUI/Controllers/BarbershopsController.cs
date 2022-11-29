using BarbershopBooking.Application.Barbershops.Queries.GetBarbershops;
using Microsoft.AspNetCore.Mvc;

namespace BarbershopBooking.WebUI.Controllers;

public class BarbershopsController: ApiControllerBase
{
    public JsonResult GetBarbershops([FromQuery] GetBarbershopsWithPaginationQuery query)
    {

        var list = new BarbershopDto[] { new BarbershopDto(Id: 1, Name: "Barbershop 1", Address: "Address 1", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 1.5, ReviewsCount: 10),
                new BarbershopDto(Id: 2, Name: "Barbershop 2", Address: "Address 2", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 4.5, ReviewsCount: 10),
                new BarbershopDto(Id: 3, Name: "Barbershop 3", Address: "Address 3", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 5, ReviewsCount: 10),
                new BarbershopDto(Id: 4, Name: "Barbershop 4", Address: "Address 4", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 0, ReviewsCount: 0),
                new BarbershopDto(Id: 5, Name: "Barbershop 5", Address: "Address 5", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 4.5, ReviewsCount: 10),
                new BarbershopDto(Id: 6, Name: "Barbershop 6", Address: "Address 6", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 4.5, ReviewsCount: 10),
                new BarbershopDto(Id: 7, Name: "Barbershop 7", Address: "Address 7", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 4.5, ReviewsCount: 10),
                new BarbershopDto(Id: 8, Name: "Barbershop 8", Address: "Address 8", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 4.5, ReviewsCount: 10),
                new BarbershopDto(Id: 9, Name: "Barbershop 9", Address: "Address 9", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 4.5, ReviewsCount: 10),
                new BarbershopDto(Id: 10, Name: "Barbershop 10", Address: "Address 10", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 4.5, ReviewsCount: 10),
                new BarbershopDto(Id: 11, Name: "Barbershop 11", Address: "Address 11", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 4.5, ReviewsCount: 10),
                new BarbershopDto(Id: 12, Name: "Barbershop 12", Address: "Address 12", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 4.5, ReviewsCount: 10),
                new BarbershopDto(Id: 13, Name: "Barbershop 13", Address: "Address 13", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 4.5, ReviewsCount: 10),
                new BarbershopDto(Id: 14, Name: "Barbershop 14", Address: "Address 14", Image: "https://source.unsplash.com/random/300x300/?barbershop", Rating: 4.5, ReviewsCount: 10) 
        };

        return new JsonResult(new
        {
            pageNumber = query.Page,
            totalPages = Math.Ceiling((double)list.Length / query.Size),
            totalCount = list.Length,
            items = list.Skip((query.Page - 1) * query.Size).Take(query.Size).ToArray()
        });
    }
}
