using Serilog.Formatting.Compact;
using Serilog.Events;
using Serilog;

namespace Api;

public static class SerilogConfiguration
{
    public static LoggerConfiguration Configure(this LoggerConfiguration loggerConfiguration,
        IConfiguration configuration)
    {
        loggerConfiguration
            .MinimumLevel.Information()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .MinimumLevel.Override("System", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .WriteTo.File(
                path: configuration["LogFilePath"]!,
                rollingInterval: RollingInterval.Day,
                rollOnFileSizeLimit: true,
                formatter: new CompactJsonFormatter());

        return loggerConfiguration;
    }
}