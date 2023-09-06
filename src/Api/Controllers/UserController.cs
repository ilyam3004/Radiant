using Microsoft.AspNetCore.Authentication.Cookies;
using Application.Authentication.Commands;
using Microsoft.AspNetCore.Authentication;
using Application.Authentication.Queries;
using Microsoft.AspNetCore.Mvc;
using Contracts.Requests;
using Contracts.Responses;
using MapsterMapper;
using MediatR;

namespace Api.Controllers;

[Route("users")]
public class UserController : ApiController
{
    private readonly ISender _sender;
    private readonly IMapper _mapper;

    public UserController(ISender sender, IMapper mapper)
    {
        _sender = sender;
        _mapper = mapper;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Result(RegisterRequest request)
    {
        Console.WriteLine(request);
        var command = _mapper.Map<RegisterCommand>(request);

        var result = await _sender.Send(command);

        return result.Match(
            value => Ok(_mapper.Map<RegisterResponse>(value)), 
            Problem);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var command = _mapper.Map<LoginQuery>(request);

        var result = await _sender.Send(command);
        
        return result.Match(
            value => Ok(_mapper.Map<LoginResponse>(value)), 
            Problem);
    }
    
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(
            CookieAuthenticationDefaults.AuthenticationScheme);
        
        return Ok("logged out");
    }
}