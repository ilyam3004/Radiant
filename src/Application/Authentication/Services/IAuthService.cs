using Application.Authentication.Queries;

namespace Application.Authentication.Services;

public interface IAuthService
{
    Task Login(LoginQuery query);
    Task Logout();
}