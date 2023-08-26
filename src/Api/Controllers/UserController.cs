using Application.Authentication.Commands;
using Contracts.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("users")]
public class UserController : ApiController
{
    private readonly ISender _sender;
    
    public UserController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Result(RegisterRequest request)
    {
        var command = new RegisterCommand(
            request.Email, 
            request.Password, 
            request.Username);
        
        var result = await _sender.Send(command);

        return result.Match(Ok, Problem);
    }

    // public async Task<IActionResult> Login(LoginRequest request)
    // {
    //     var query = new LoginQuery()
    //     {
    //         
    //     }
    // }
}