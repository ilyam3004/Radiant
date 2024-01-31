using Api.Middlewares;

namespace Api.Extensions;

public static class ExceptionMiddlewareExtensions
{
    public static IApplicationBuilder UseExceptionMiddleware(this IApplicationBuilder app)
        => app.UseMiddleware<ExceptionHandlingMiddleware>();

    public static IServiceCollection AddExceptionHandlingMiddleware(this IServiceCollection services)
        => services.AddTransient<ExceptionHandlingMiddleware>();
}