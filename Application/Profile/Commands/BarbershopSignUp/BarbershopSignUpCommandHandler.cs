using BarbershopBooking.Application.Common.Interfaces;
using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;
using MediatR;

namespace BarbershopBooking.Application.Profile.Commands.BarbershopSignUp;

public class BarbershopSignUpCommandHandler : IRequestHandler<BarbershopSignUpCommand, CommandResult<AuthToken>>
{
    private readonly IIdentityService _identityService;

    public BarbershopSignUpCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public Task<CommandResult<AuthToken>> Handle(BarbershopSignUpCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
