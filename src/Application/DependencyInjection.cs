using Application.ToDoLists.Commands.CreateTodoList;
using Application.ToDoItems.Commands.CreateTodoItem;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.DependencyInjection;
using Application.Authentication.Commands;
using Application.Authentication.Services;
using Application.Authentication.Queries;
using Application.Common.Extensions;
using Application.Models.TodoLists;
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
                .AddValidationBehavior<LoginQuery, LoginResult>()
                .AddValidationBehavior<CreateTodoListCommand, TodoListResult>()
                .AddValidationBehavior<CreateTodoItemCommand, TodoListResult>()
                .AddLoggingBehaviour<RegisterCommand, RegisterResult>());

        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
            {
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    return Task.CompletedTask;
                };
            });
        
        services.AddScoped<IAuthService, AuthService>();
        services.AddHttpContextAccessor();
        
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        return services;
    }
}