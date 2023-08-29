using Application.Common.Behaviors;
using Application.Common.Interfaces.Persistence;
using Application.Models;
using Domain.Common.Exceptions;
using Domain.Entities;
using FluentValidation;
using LanguageExt.Common;
using MediatR;

namespace Application.Authentication.Commands;

public class RegisterCommandHandler
    : IRequestHandler<RegisterCommand, Result<RegisterResult, Exception>>
{
    private readonly IUnitOfWork _unitOfWork;

    public RegisterCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<RegisterResult, Exception>> Handle(
        RegisterCommand command,
        CancellationToken cancellationToken)
    {
        //validate request
        
        //if request is not valid, return error

        if (_unitOfWork.Users.UserExists(command.Email))
        {
            var exception = new DuplicateEmailException();
            return exception;
        }
        
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = command.Email,
            Username = command.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(command.Password),
        };
        
        _unitOfWork.Users.Add(user);
        _unitOfWork.SaveChanges();
        
        return new RegisterResult(user, "token");
    }
}