using Application.Common.Interfaces.Persistence;
using Domain.Common.Exceptions;
using LanguageExt.Common;
using Application.Models;
using Domain.Entities;
using MediatR;

namespace Application.Authentication.Commands;

public class RegisterCommandHandler
    : IRequestHandler<RegisterCommand, Result<RegisterResult>>
{
    private readonly IUnitOfWork _unitOfWork;

    public RegisterCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<RegisterResult>> Handle(
        RegisterCommand command,
        CancellationToken cancellationToken)
    {
        if (await _unitOfWork.Users.UserExistsByEmail(command.Email))
        {
            var exception = new DuplicateEmailException();
            return new Result<RegisterResult>(exception);
        }
        
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = command.Email,
            Username = command.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(command.Password),
        };
        
        await _unitOfWork.Users.AddAsync(user);
        _unitOfWork.SaveChanges();
        
        return new RegisterResult(user);
    }
}