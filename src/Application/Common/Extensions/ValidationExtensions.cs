using Microsoft.Extensions.DependencyInjection;
using Application.Common.Behaviors;
using LanguageExt.Common;
using MediatR;

namespace Application.Common.Extensions;

public static class ValidationExtensions
{
    public static MediatRServiceConfiguration AddValidationBehavior<TRequest, TResponse>(
        this MediatRServiceConfiguration config) 
        where TRequest : IRequest<Result<TResponse>>
    {
        return config.AddBehavior<
            IPipelineBehavior<TRequest, Result<TResponse>>, 
            ValidationBehavior<TRequest, TResponse>>();
    }
}