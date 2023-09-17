using System.Net.Http.Json;
using Web.Models.Responses;
using OneOf;

namespace Web.Services;

public class TodoListService : ITodoListService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private HttpClient HttpClient => _httpClientFactory.CreateClient("API");

    public TodoListService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<OneOf<GetTodoListsResponse, ErrorResponse>> GetUserTodoLists()
    {
        var response = await 
            HttpClient.GetAsync("todo-lists");

        if (response.IsSuccessStatusCode)
        {
            var result = await response.Content
                .ReadFromJsonAsync<GetTodoListsResponse>();

            return result!;
        }

        var errorResult = await response.Content
                .ReadFromJsonAsync<ErrorResponse>();

        return errorResult!;
    }

    public async Task<OneOf<TodoListResponse, ErrorResponse>> CreateTodoList(
        string title)
    {
        var response = await HttpClient.PostAsync(
            $"todo-lists/create/{title}", null);

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

    public async Task<OneOf<RemoveTodoListResponse, ErrorResponse>> RemoveTodoList(
        Guid todoListId)
    {
        var response = await HttpClient.DeleteAsync(
            $"todo-lists/remove/{todoListId}");

        if (response.IsSuccessStatusCode)
        {
            var result = await response.Content
                .ReadFromJsonAsync<RemoveTodoListResponse>();

            return result!;
        }

        var errorResult = await response.Content
                .ReadFromJsonAsync<ErrorResponse>();

        return errorResult!;
    }
}
