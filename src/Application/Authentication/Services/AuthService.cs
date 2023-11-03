using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Application.Models.Authentication;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Application.Authentication.Services;

public class AuthService : IAuthService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task Login(AuthRequest request)
    {
        var claims = new List<Claim>
        {
            new(type: ClaimTypes.Email, value: request.Email),
            new(type: ClaimTypes.NameIdentifier, value: request.UserId.ToString())
        };

        var identity = new ClaimsIdentity(claims,
            CookieAuthenticationDefaults.AuthenticationScheme);

        await _httpContextAccessor.HttpContext!.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(identity),
            new AuthenticationProperties
            {
                IsPersistent = true,
                AllowRefresh = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddHours(4)
            });
    }

    public string? GetUserId()
    {
        return _httpContextAccessor.HttpContext!.User
            .FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }

    public List<UserClaim> GetUserClaims()
        => _httpContextAccessor.HttpContext!
            .User
            .Claims
            .Select(x => new UserClaim(x.Type, x.Value))
            .ToList();

    public Task Logout()
        => _httpContextAccessor.HttpContext!.SignOutAsync(
            CookieAuthenticationDefaults.AuthenticationScheme);
}