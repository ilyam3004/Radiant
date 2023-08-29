using Application.Common.Behaviors;
using Application.Models;
using FluentValidation;
using MediatR;

namespace Application.Authentication.Commands;

public record RegisterCommand(
    string Email, 
    string Password, 
    string Username) : IRequest<Result<RegisterResult, Exception>>;