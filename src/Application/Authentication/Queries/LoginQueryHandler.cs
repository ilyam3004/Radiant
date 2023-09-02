using Application.Common.Interfaces.Persistence;
using Application.Authentication.Services;
using System.Security.Authentication;
using Domain.Common.Exceptions;
using Application.Models;
using Application.Models.Authentication;
using LanguageExt.Common;
using MediatR;

namespace Application.Authentication.Queries;

public class LoginQueryHandler
    : IRequestHandler<LoginQuery, Result<LoginResult>>
{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;
    public LoginQueryHandler(
        IAuthService authService, 
        IUnitOfWork unitOfWork)
    {
        _authService = authService;
        _unitOfWork = unitOfWork;
    }
    
    public async Task<Result<LoginResult>> Handle(LoginQuery query, 
        CancellationToken cancellationToken)
    {
        var user = await _unitOfWork.Users.GetByEmail(query.Email);
        if (user is null)
        {
            var notFoundException = new UserNotFoundException();
            return new Result<LoginResult>(notFoundException);
        }

        if (!PasswordMatches(query.Password, user.PasswordHash))
        {
            var invalidPasswordException = new InvalidCredentialException(
                "Invalid email or password");
            return new Result<LoginResult>(invalidPasswordException);
        }

        var authRequest = new AuthRequest(user.Email, user.Id);
        await _authService.Login(authRequest);
        
        return new LoginResult(user);
    }
    
    private bool PasswordMatches(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}