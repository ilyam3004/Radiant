using Application.Authentication.Commands;
using Application.Authentication.Queries;
using Application.Models;
using FluentAssertions;

namespace Application.UnitTests.TestUtils.Extensions;

public static partial class Validations
{
    public static void ValidateCreatedFrom(this RegisterResult result,
        RegisterCommand registerCommand)
    {
        result.User.Email.Should().Be(registerCommand.Email);
        result.User.Username.Should().Be(registerCommand.Username);
    }

    public static void ValidateCreatedFrom(this LoginResult result, LoginQuery query)
    {
        result.User.Email.Should().Be(query.Email);
    }
}