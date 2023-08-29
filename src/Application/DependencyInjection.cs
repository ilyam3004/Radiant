using Microsoft.Extensions.DependencyInjection;
using Application.Common.Behaviors;
using System.Reflection;
using Application.Authentication.Commands;
using Application.Models;
using FluentValidation;
using MediatR;

namespace Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddMediatR(cfg => 
            cfg.RegisterServicesFromAssemblies(AppDomain.CurrentDomain.GetAssemblies())
                .AddBehavior<IPipelineBehavior<RegisterCommand, Result<RegisterResult, Exception>>,
                ValidationBehavior<RegisterCommand, RegisterResult>>());
        
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        
        return services;
    }
}