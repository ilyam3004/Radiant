using Api.Common.Mapping;
using Infrastructure;
using Application;
using Serilog;
using Api;
using Api.Extensions;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddPresentation();
    builder.Services.AddApplication();
    builder.Services.AddPersistence(builder.Configuration);
    builder.Services.AddMappings();
    builder.Host.UseSerilog((context, configuration) 
        => configuration.Configure(context.Configuration));
}

var app = builder.BuildWithOptions();

app.Run();