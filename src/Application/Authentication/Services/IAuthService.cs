using Application.Models.Authentication;

namespace Application.Authentication.Services;

public interface IAuthService
{
    Task Login(AuthRequest request);
    List<UserClaim> GetUserClaims();
    string? GetUserId();
    Task Logout();
}