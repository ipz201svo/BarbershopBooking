using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;
using MediatR;

namespace BarbershopBooking.Application.Profile.Commands.RefreshToken;

public record RefreshTokenCommand(string Token, string RefreshToken) : IRequest<CommandResult<AuthToken>>;
