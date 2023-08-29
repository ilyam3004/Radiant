using Microsoft.Extensions.DependencyInjection;
using Application.Common.Behaviors;
using System.Reflection;
using Application.Authentication.Commands;
using Application.Models;
using LanguageExt.Common;
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
                .AddBehavior<IPipelineBehavior<RegisterCommand, Result<RegisterResult>>,
                ValidationBehavior<RegisterCommand, RegisterResult>>());
        
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        
        return services;
    }
}