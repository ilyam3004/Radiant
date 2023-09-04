namespace Web.Pages.Login;

public partial class Login
{
    private bool loading = false;
    private bool submitted = false;
    private LoginModel loginModel = new LoginModel();
    private string returnUrl;

    private class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    private async Task HandleSubmit()
    {
        submitted = true;

        loading = true;

        await Task.Delay(2000);

        loading = false;
        
        NavigationManager.NavigateTo("./todo");
    }
}