using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;
using MediatR;

namespace BarbershopBooking.Application.Profile.Commands.SignIn;

public record SignInCommand(string email, string password): IRequest<CommandResult<AuthToken>>;
