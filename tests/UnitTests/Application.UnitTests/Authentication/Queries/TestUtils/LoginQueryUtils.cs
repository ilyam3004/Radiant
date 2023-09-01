using Application.Authentication.Queries;
using Application.UnitTests.TestUtils.Constants;
using Domain.Entities;

namespace Application.UnitTests.Authentication.Queries.TestUtils;

public class LoginQueryUtils
{
    public static LoginQuery CreateLoginQuery() =>
        new LoginQuery(
            Constants.Authentication.Email, 
            Constants.Authentication.Password);
    
    public static User CreateUserWithCorrectPasswordHash() =>
        new User
        {
            Id = Guid.NewGuid(),
            Email = Constants.Authentication.Email,
            PasswordHash = Constants.Authentication.CorrectPasswordHash,
            Username = Constants.Authentication.Username
        };
    
    public static User CreateUserWithWrongPasswordHash() =>
        new User
        {
            Id = Guid.NewGuid(),
            Email = Constants.Authentication.Email,
            PasswordHash = Constants.Authentication.WrongPasswordHash,
            Username = Constants.Authentication.Username
        };
}