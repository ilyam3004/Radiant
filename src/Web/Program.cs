using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Web.Handlers;
using Web.Services;
using Web;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(
    sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) }
);

builder.Services.AddScoped<CookieHandler>();

builder.Services
    .AddHttpClient(
        "API",
        options =>
        {
            options.BaseAddress = new Uri("https://todo-flow-api.azurewebsites.net/");
        }
    )
    .AddHttpMessageHandler<CookieHandler>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITodoListService, TodoListService>();
builder.Services.AddScoped<ITodoItemService, TodoItemService>();

await builder.Build().RunAsync();
