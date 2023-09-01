using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.DependencyInjection;
using Application.Authentication.Commands;
using Application.Authentication.Services;
using Application.Authentication.Queries;
using Application.Common.Extensions;
using Microsoft.AspNetCore.Http;
using Application.Models;
using System.Reflection;
using FluentValidation;

namespace Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddMediatR(cfg => 
            cfg.RegisterServicesFromAssemblies(AppDomain.CurrentDomain.GetAssemblies())
                .AddValidationBehavior<RegisterCommand, RegisterResult>()
                .AddValidationBehavior<LoginQuery, LoginResult>());
        
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    return Task.CompletedTask;
                });

        services.AddScoped<IAuthService, AuthService>();
        services.AddHttpContextAccessor();
        
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        
        return services;
    }
}