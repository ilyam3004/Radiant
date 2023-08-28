using Application.Authentication.Commands;
using Application.Models;
using Domain.Entities;
using FluentAssertions;

namespace Application.UnitTests.TestUtils.Extensions;

public static partial class Validations
{
    public static void ValidateCreatedFrom(this RegisterResult result,
        RegisterCommand registerCommand)
    {
        result.User.Email.Should().Be(registerCommand.Email);
        result.User.Password.Should().NotBe(registerCommand.Password);
        result.User.Username.Should().Be(registerCommand.Username);
    }
}