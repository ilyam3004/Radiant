using Application.Models;
using LanguageExt.Common;
using MediatR;

namespace Application.Authentication.Queries;

public record LoginQuery(
    string Token): IRequest<Result<LoginResult>>;