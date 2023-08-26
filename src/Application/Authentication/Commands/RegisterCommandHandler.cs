using Application.Models;
using LanguageExt.Common;
using MediatR;

namespace Application.Authentication.Commands;

public class RegisterCommandHandler
    : IRequestHandler<RegisterCommand, Result<RegisterResponse>>
{
    public async Task<Result<RegisterResponse>> Handle(
        RegisterCommand command,
        CancellationToken cancellationToken)
    {
        return new Result<RegisterResponse>();
    }
}