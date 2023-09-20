using Application.Authentication.Commands;
using Application.Authentication.Services;
using Application.Authentication.Queries;
using Contracts.Responses;
using Contracts.Requests;
using MapsterMapper;
using MediatR;
using Carter;

namespace Api.Endpoints;

public class UserEndpoints : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        var endpoints = app.MapGroup("users");
        
        endpoints.MapPost("register", Register);
        endpoints.MapPost("login", Login);
        endpoints.MapGet("user", User).RequireAuthorization();
        endpoints.MapGet("logout", Logout).RequireAuthorization();
    }

    private static async Task<IResult> Register(ISender sender, 
        IMapper mapper,
        RegisterRequest request)
    {
        var command = mapper.Map<RegisterCommand>(request);

        var result = await sender.Send(command);

        return result.Match(
            value => Results.Ok(mapper.Map<RegisterResponse>(value)), 
            ApiEndpoints.Problem);
    }
    
    private static async Task<IResult> Login(ISender sender, 
        IMapper mapper, 
        LoginRequest request)
    {
        var command = mapper.Map<LoginQuery>(request);

        var result = await sender.Send(command);
        
        return result.Match(
            value => Results.Ok(mapper.Map<LoginResponse>(value)), 
            ApiEndpoints.Problem);
    }

    private static IResult User(IAuthService authService)
    {
        var claims = authService.GetUserClaims();
        return Results.Ok(claims);
    }

    private static async Task<IResult> Logout(IAuthService authService)
    {
        await authService.Logout();
        
        return Results.Ok("Successfully logged out");
    }
}