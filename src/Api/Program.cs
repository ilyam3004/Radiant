using Api;
using Api.Common.Mapping;
using Application;
using Infrastructure;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddPresentation();
    builder.Services.AddApplication();
    builder.Services.AddPersistence(builder.Configuration);
    builder.Services.AddMappings();
}

var app = builder.Build();
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapControllers();
    app.Run();
}