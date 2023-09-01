using Application.Models;
using LanguageExt.Common;
using MediatR;

namespace Application.Authentication.Queries;

public record LoginQuery(
    string Email,
    string Password): IRequest<Result<LoginResult>>;