using Carter;
using Serilog;

namespace Api.Extensions;

public static class BuildExtensions
{
    public static WebApplication BuildWithOptions(this WebApplicationBuilder builder)
    {
        var app = builder.Build();

        app.UseSerilogRequestLogging();

        app.UseCors("CorsPolicy");

        app.UseAuthentication();
        app.UseAuthorization();
        
        app.MapCarter();
        
        //app.UseExceptionMiddleware();

        return app;
    }
}