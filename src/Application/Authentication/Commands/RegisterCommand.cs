using Application.Models;
using LanguageExt.Common;
using MediatR;

namespace Application.Authentication.Commands;

public record RegisterCommand(
    string Email,
    string Password,
    string Username) : IRequest<Result<RegisterResult>>;