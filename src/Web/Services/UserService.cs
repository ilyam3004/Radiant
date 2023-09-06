using System.Net.Http.Json;
using Web.Models.Requests;
using Web.Models.Response;
using OneOf;

namespace Web.Services;

public class UserService : IUserService
{
    private readonly HttpClient _httpClient;

    public UserService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<OneOf<LoginResponse, ErrorResponse>> Login(LoginRequest request)
    {

        var response = await _httpClient
            .PostAsJsonAsync("users/register", request);

        if (response.IsSuccessStatusCode)
        {
            var result = await response.Content
                .ReadFromJsonAsync<LoginResponse>();

            return result;
        }

        var errorResult = await response.Content
                .ReadFromJsonAsync<ErrorResponse>();

        return errorResult;
    }

    public async Task<OneOf<RegisterResponse, ErrorResponse>> Register(RegisterRequest request)
    {
        var response = await _httpClient
            .PostAsJsonAsync("users/register", request);

        if (response.IsSuccessStatusCode)
        {
            var result = await response.Content
                .ReadFromJsonAsync<RegisterResponse>();

            return result;
        }
        
        var errorResult = await response.Content
                .ReadFromJsonAsync<ErrorResponse>();

        return errorResult;
    }
}