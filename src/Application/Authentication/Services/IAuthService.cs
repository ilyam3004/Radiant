using Application.Models.Authentication;

namespace Application.Authentication.Services;

public interface IAuthService
{
    Task Login(AuthRequest request);
    Dictionary<string, string> GetUserClaims();
    string? GetUserId();
    Task Logout();
}