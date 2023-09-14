using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Web.Handlers;
using Web.Services;
using Web;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp =>
    new HttpClient
    {
        BaseAddress = new Uri(builder.HostEnvironment.BaseAddress)
    });

builder.Services.AddHttpClient("API", options =>
    {
        options.BaseAddress = new Uri("http://api:5074/");
    })
    .AddHttpMessageHandler<CookieHandler>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITodoListService, TodoListService>();
builder.Services.AddScoped<ITodoItemService, TodoItemService>();

builder.Services.AddScoped<CookieHandler>();

await builder.Build().RunAsync();