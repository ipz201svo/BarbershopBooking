using FluentValidation;

namespace BarbershopBooking.Application.Profile.Commands.CustomerSignUp;

public class CustomerSignUpCommandValidator : AbstractValidator<CustomerSignUpCommand>
{
    public CustomerSignUpCommandValidator()
    {
        RuleFor(x => x.DateOfBirth)
            .NotEmpty().WithMessage("Date of birth is required.")
            .LessThan(DateTime.Now).WithMessage("Date of birth must be less than today's date");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required.")
            .Matches(@"^(?:\+38)?(?:\(044\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$").WithMessage("Phone number must be valid.");

        RuleFor(x => x.City)
            .NotEmpty().WithMessage("City is required.");
        
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required.");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("Email address must be valid");
    }
}
