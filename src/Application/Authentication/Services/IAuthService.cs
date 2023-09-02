using Application.Models.Authentication;

namespace Application.Authentication.Services;

public interface IAuthService
{
    Task Login(AuthRequest request);
    string? GetUserId();
    Task Logout();
}