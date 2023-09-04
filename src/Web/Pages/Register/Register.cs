using System.Net.Http.Json;
using Microsoft.JSInterop;

namespace Web.Pages.Register;

public partial class Register
{
    private bool loading = false;
    private RegisterRequest _registerRequest = new RegisterRequest();

    private async Task HandleSubmit()
    {
        loading = true;

        try
        {
            var registrationData = new
            {
                Email = _registerRequest.Email,
                Password = _registerRequest.Password
            };
            
            var response = await HttpClient.PostAsJsonAsync(
                "http://localhost:5074/users/register", registrationData);

            if (response.IsSuccessStatusCode)
            {
                jsRuntime.InvokeVoidAsync("alert", "Registration successful. You can now log in.");
                Navigation.NavigateTo("./login");
            }
            else
            {
                jsRuntime.InvokeVoidAsync("alert", "Registration failed. Please try again.");
            }
        }
        catch (Exception ex)
        {
            jsRuntime.InvokeVoidAsync("alert", $"Error: {ex.Message}");
        }
        finally
        {
            loading = false;
        }
    }
    
    private class RegisterRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}