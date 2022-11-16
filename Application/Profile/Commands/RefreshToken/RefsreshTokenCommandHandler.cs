using BarbershopBooking.Application.Common.Interfaces;
using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;
using MediatR;

namespace BarbershopBooking.Application.Profile.Commands.RefreshToken;

internal class RefsreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, CommandResult<AuthToken>>
{
    private readonly IIdentityService _identityService;

    public RefsreshTokenCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<CommandResult<AuthToken>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var(token, refreshToken) = request;
        return (await _identityService.RefreshTokenAsync(token, refreshToken)).ToCommandResult();
    }
}
