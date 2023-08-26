using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(
        this IServiceCollection services, 
        ConfigurationManager configurationManager)
    {
        services.AddDbContext<TodoDbContext>(
            options => options.UseNpgsql(
                configurationManager
                    .GetConnectionString("DefaultConnection")));
        
        return services;
    }
}