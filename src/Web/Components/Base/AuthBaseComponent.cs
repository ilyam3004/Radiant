using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Text.Json;
using Newtonsoft.Json.Bson;
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

    protected RegisterRequest registerRequest = new RegisterRequest();
    protected LoginRequest loginRequest = new LoginRequest();

    protected bool isError;

    protected bool loading;

    protected ErrorResponse errorResponse = new();

    protected async Task HandleRegisterSubmit()
    {
        loading = true;
        var response = await UserService.Register(registerRequest);
        loading = false;

        if (response.IsT1) 
        {
            errorResponse = response.AsT1;
            ShowError();
            return;
        }

        Navigation.NavigateTo("../login");
    }

    protected async Task HandleLoginSubmit()
    {
        loading = true;
        var response = await UserService.Login(loginRequest);
        loading = false;
        Navigation.NavigateTo("../todo");
    }

    private async Task ShowError() 
    {
        isError = true;
        await Task.Delay(5000);
        isError = false;
    }
}