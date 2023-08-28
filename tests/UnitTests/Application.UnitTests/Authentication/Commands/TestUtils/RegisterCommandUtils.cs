using Application.UnitTests.TestUtils.Constants;
using Application.Authentication.Commands;

namespace Application.UnitTests.Authentication.Commands.TestUtils;

public static class RegisterCommandUtils
{
    public static RegisterCommand CreateRegisterCommand() =>
        new RegisterCommand(
            Constants.Authentication.Email, 
            Constants.Authentication.Password,
            Constants.Authentication.Username);
}