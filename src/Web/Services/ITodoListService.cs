using Web.Models.Response;
using Web.Models;
using OneOf;

namespace Web.Services;

public interface ITodoListService
{
    Task<OneOf<GetTodoListsResponse, ErrorResponse>> GetUserTodoLists();
    Task<OneOf<TodoListResponse, ErrorResponse>> CreateTodoList(string title);
}
