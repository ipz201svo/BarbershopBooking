using BarbershopBooking.Application.Common.Interfaces;
using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;
using MediatR;

namespace BarbershopBooking.Application.Profile.Commands.CustomerSignUp;

public class CustomerSignUpCommandHandler : IRequestHandler<CustomerSignUpCommand, CommandResult<AuthToken>>
{
    private readonly IIdentityService _identityService;

    public CustomerSignUpCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }
    
    public async Task<CommandResult<AuthToken>> Handle(CustomerSignUpCommand request, CancellationToken cancellationToken)
    {
        var (firstName,
            lastName,
            email,
            dateOfBirth,
            phoneNumber,
            city,
            password) = request;
        var result = await _identityService.RegisterCustomerAsync(new CreateCustomerDto(firstName, lastName, email, dateOfBirth, phoneNumber, city, password));

        return result.ToCommandResult();
    }
}
