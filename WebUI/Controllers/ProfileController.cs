using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.BarbershopSignUp;
using BarbershopBooking.Application.Profile.Commands.Common;
using BarbershopBooking.Application.Profile.Commands.CustomerSignUp;
using BarbershopBooking.Application.Profile.Commands.RefreshToken;
using BarbershopBooking.Application.Profile.Commands.SignIn;
using Microsoft.AspNetCore.Mvc;

namespace BarbershopBooking.WebUI.Controllers
{
    public class ProfileController: ApiControllerBase
    {
        [HttpPost("signup")]
        public async Task<ActionResult<CommandResult<AuthToken>>> CustomerSignUp([FromBody] CustomerSignUpCommand customerSignUpCommand)
        {
            return await Mediator.Send(customerSignUpCommand);
        }

        [HttpPost("barbershop-signup")]
        public async Task<ActionResult<CommandResult<AuthToken>>> BarbershopSignUp([FromBody] BarbershopSignUpCommand barbershopSignUpCommand)
        {
            return await Mediator.Send(barbershopSignUpCommand);
        }

        [HttpPost("signin")]
        public async Task<ActionResult<CommandResult<AuthToken>>> SignIn([FromBody] SignInCommand signInCommand)
        {
            return await Mediator.Send(signInCommand);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<CommandResult<AuthToken>>> RefreshToken([FromBody] RefreshTokenCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
