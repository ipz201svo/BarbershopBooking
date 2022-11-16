using FluentValidation;

namespace BarbershopBooking.Application.Profile.Commands.BarbershopSignUp;

public class BarbershopSignUpCommandValidator: AbstractValidator<BarbershopSignUpCommand>
{
	public BarbershopSignUpCommandValidator()
	{
        RuleFor(x => x.Name)
           .NotEmpty().WithMessage("Name is required.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("Email address must be valid");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required.")
            .Matches(@"^(?:\+38)?(?:\(044\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$").WithMessage("Phone number must be valid.");

        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("Address is required.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.");
    }
}
