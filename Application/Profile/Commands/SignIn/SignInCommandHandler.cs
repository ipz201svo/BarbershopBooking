using BarbershopBooking.Application.Common.Interfaces;
using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;
using MediatR;

namespace BarbershopBooking.Application.Profile.Commands.SignIn;

public class SignInCommandHandler : IRequestHandler<SignInCommand, CommandResult<AuthToken>>
{
    private readonly IIdentityService _identityService;

    public SignInCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<CommandResult<AuthToken>> Handle(SignInCommand request, CancellationToken cancellationToken)
    {
        var (email, password) = request;
        var result = await _identityService.AuthenticateAsync(email, password);

        return result.ToCommandResult();
    }
}
