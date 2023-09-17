using Application.Common.Behaviors;
using LanguageExt.Common;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Common.Extensions;

public static class LoggingExtensions
{
    public static MediatRServiceConfiguration AddLoggingBehaviour<TRequest, TResponse>(
        this MediatRServiceConfiguration config) 
        where TRequest : IRequest<Result<TResponse>>
    {
        return config.AddBehavior<
            IPipelineBehavior<TRequest, Result<TResponse>>, 
            LoggingBehaviour<TRequest, TResponse>>();
    }
}