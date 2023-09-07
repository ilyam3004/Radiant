using Api.Common.Mapping;
using Infrastructure;
using Application;
using Api;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddPresentation();
    builder.Services.AddApplication();
    builder.Services.AddPersistence(builder.Configuration);
    builder.Services.AddMappings();
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("corsSpecs", builder =>
        {
            builder.WithOrigins("http://localhost:5076")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials();
        });
    });
}

var app = builder.Build();
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseCors("corsSpecs");
    app.MapControllers();
    app.Run();
}