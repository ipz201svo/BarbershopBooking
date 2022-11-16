namespace BarbershopBooking.Application.Profile.Commands.Common;

public record CreateCustomerDto(
    string FirstName,
    string LastName,
    string Email,
    DateTime DateOfBirth,
    string PhoneNumber,
    string City,
    string Password);
