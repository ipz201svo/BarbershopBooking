using BarbershopBooking.Application.Common.Models;
using MediatR;

namespace BarbershopBooking.Application.Barbershops.Queries.GetBarbershops;

public record GetBarbershopsWithPaginationQuery : IRequest<PaginatedList<BarbershopDto>>
{
    public int Page { get; set; } = 1;
    public int Size { get; set; } = 10;
    public List<string> SortBy { get; set; } = new();
}
