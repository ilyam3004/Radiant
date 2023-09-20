using Serilog;
using Carter;

namespace Api;

public static class BuildExtensions
{
    public static WebApplication BuildWithOptions(
        this WebApplicationBuilder builder)
    {
        var app = builder.Build();

        app.UseSerilogRequestLogging();

        app.UseCors("CorsPolicy");

        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseAuthentication();
        app.UseAuthorization();
        
        app.MapCarter();

        return app;
    }
}