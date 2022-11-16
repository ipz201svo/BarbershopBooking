using BarbershopBooking.Application.Common.Models;
using BarbershopBooking.Application.Profile.Commands.Common;
using MediatR;

namespace BarbershopBooking.Application.Profile.Commands.CustomerSignUp;

public record CustomerSignUpCommand(
    string FirstName,
    string LastName,
    string Email,
    DateTime DateOfBirth,
    string PhoneNumber,
    string City,
    string Password) : IRequest<CommandResult<AuthToken>>;

//public class CustomerSignUpCommand : IRequest<CommandResult<string>>
//{
//    public string FirstName { get; set; }
//    public string LastName { get; set; }
//    public string Email { get; set; }
//    public DateTime DateOfBirth { get; set; }
//    public string PhoneNumber { get; set; }
//    public string City { get; set; }
//    public string Password { get; set; }

//    public void Deconstruct(
//        out string firstName,
//    out string lastName,
//    out string email,
//    out DateTime dateOfBirth,
//    out string phoneNumber,
//    out string city,
//    out string password)
//    {
//        firstName = FirstName;
//        lastName = LastName;
//        email = Email;
//        dateOfBirth = DateOfBirth;
//        phoneNumber = PhoneNumber;
//        city = City;
//        password = Password;
//    }
//}
