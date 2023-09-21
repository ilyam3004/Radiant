using Carter;

namespace Api;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(
        this IServiceCollection services)
    {
        services.AddHttpContextAccessor();
        
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", builder => builder
                .SetIsOriginAllowed((host) => true)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());
        });
        
        services.AddAuthorization();

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddCarter();

        return services;
    }
}