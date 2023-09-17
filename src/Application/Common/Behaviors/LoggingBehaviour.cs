using Microsoft.Extensions.Logging;
using System.Diagnostics;
using LanguageExt.Common;
using MediatR;

namespace Application.Common.Behaviors;

public class LoggingBehaviour<TRequest, TResponse>
    : IPipelineBehavior<TRequest, Result<TResponse>>
    where TRequest : IRequest<Result<TResponse>>
{
    private readonly ILogger<LoggingBehaviour<TRequest, TResponse>> _logger;

    public LoggingBehaviour(ILogger<LoggingBehaviour<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }

    public async Task<Result<TResponse>> Handle(
        TRequest request, 
        RequestHandlerDelegate<Result<TResponse>> next, 
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Start handling {@RequestName}, {@DateTimeUtc}", 
            typeof(TRequest).Name,
            DateTime.UtcNow);
        
        var response = await next();
        if (!response.IsSuccess)
        {
            var error = response.Match<Exception>(
                value => null!, 
                error => error);
            
            _logger.LogError("Request failure {@RequestName}, {@Error}, {@DateTimeUtc}", 
            typeof(TRequest).Name,
            error.Message,
            DateTime.UtcNow);
        }
        
        _logger.LogInformation("Completed handling {@RequestName}, {@DateTimeUtc}",
            typeof(TRequest).Name,
            DateTime.UtcNow);

        return response;
    }
};
