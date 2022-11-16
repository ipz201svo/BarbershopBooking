using FluentValidation;

namespace BarbershopBooking.Application.Profile.Commands.RefreshToken;

internal class RefreshTokenCommandValidator: AbstractValidator<RefreshTokenCommand>
{
	public RefreshTokenCommandValidator()
	{
        RuleFor(x => x.Token)
            .NotEmpty().WithMessage("Token is required.");

        RuleFor(x => x.RefreshToken)
            .NotEmpty().WithMessage("RefreshToken is required.");
    }
}
