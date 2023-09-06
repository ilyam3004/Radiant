using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Web.Models.Requests;
using Web.Models.Response;
using Web.Services;

namespace Web.Components.Base;

public class AuthBaseComponent : ComponentBase
{
    [Inject]
    public IUserService UserService { get; set; }

    [Inject]
    public NavigationManager Navigation { get; set; }

    [Inject]
    public IJSRuntime jsRuntime { get; set; }

    protected readonly RegisterRequest _registerRequest = new();
    protected readonly LoginRequest _loginRequest = new();
    protected ErrorResponse ErrorResponse = new();

    protected bool IsError;
    protected bool Loading;

    protected async Task HandleRegisterSubmit()
    {
        IsError = false;
        Loading = true;
        var response = await UserService.Register(_registerRequest);
        Loading = false;
        
        if (response.IsT1) 
        {
            ErrorResponse = response.AsT1;
            IsError = true;
            
            return;
        }

        Navigation.NavigateTo("../login");
    }

    protected async Task HandleLoginSubmit()
    {
        IsError = false;
        Loading = true;
        var response = await UserService.Login(_loginRequest);
        Loading = false;
        
        if (response.IsT1) 
        {
            ErrorResponse = response.AsT1;
            IsError = true;
            
            return;
        }

        Navigation.NavigateTo("../todo");
    }
}