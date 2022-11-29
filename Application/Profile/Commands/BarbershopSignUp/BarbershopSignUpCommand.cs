using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;
using MediatR;

namespace BarbershopBooking.Application.Profile.Commands.BarbershopSignUp;

public record BarbershopSignUpCommand(
    string Name,
    string Email,
    string PhoneNumber,
    Address Address,
    string Password) : IRequest<CommandResult<AuthToken>>;
