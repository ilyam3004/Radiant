using Application.Models;
using LanguageExt.Common;
using MediatR;

namespace Application.Authentication.Queries;

public class LoginQueryHandler
    : IRequestHandler<LoginQuery, Result<LoginResult>>
{
    public async Task<Result<LoginResult>> Handle(LoginQuery query, 
        CancellationToken cancellationToken)
    {
        return new Result<LoginResult>();
    }
}