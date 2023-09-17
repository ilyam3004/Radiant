using System.Net.Http.Json;
using System.Text;
using OneOf;
using Web.Models.Requests;
using Web.Models.Responses;

namespace Web.Services;

public class TodoItemService : ITodoItemService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private HttpClient HttpClient => _httpClientFactory.CreateClient("API");

    public TodoItemService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }
    
    
    public async Task<OneOf<TodoListResponse, ErrorResponse>> AddTodoItem(
        CreateTodoItemRequest request)
    {
        var jsonContent = new StringContent(
            Newtonsoft.Json.JsonConvert.SerializeObject(request),
            Encoding.UTF8,
            "application/json"
        );

        var response = await HttpClient.PostAsync(
            $"todo-items/create", jsonContent);

        if (response.IsSuccessStatusCode)
        {
            var result = await response.Content
                .ReadFromJsonAsync<TodoListResponse>();

            return result!;
        }

        var errorResult = await response.Content
            .ReadFromJsonAsync<ErrorResponse>();

        return errorResult!;
    }

    public async Task<OneOf<TodoListResponse, ErrorResponse>> RemoveTodoItem(Guid todoItemId)
    {
        var response = await HttpClient.DeleteAsync(
            $"todo-items/remove/{todoItemId}");

        if (response.IsSuccessStatusCode)
        {
            var result = await response.Content
                .ReadFromJsonAsync<TodoListResponse>();

            return result!;
        }

        var errorResult = await response.Content
            .ReadFromJsonAsync<ErrorResponse>();

        return errorResult!;
    }

    public async Task<OneOf<TodoItemResponse, ErrorResponse>> ToggleTodoItem(Guid todoItemId)
    {
        var response = await HttpClient.PutAsync(
            $"todo-items/{todoItemId}/toggle", null);

        if (response.IsSuccessStatusCode)
        {
            var result = await response.Content
                .ReadFromJsonAsync<TodoItemResponse>();

            return result!;
        }

        var errorResult = await response.Content
            .ReadFromJsonAsync<ErrorResponse>();

        return errorResult!;
    }
}