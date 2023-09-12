using Contracts.Requests;
using Contracts.Responses.TodoLists;
using Web.Models.Response;
using OneOf;

namespace Web.Services;

public interface ITodoItemService
{
    Task<OneOf<TodoListResponse, ErrorResponse>> AddTodoItem(CreateTodoItemRequest request);
    Task<OneOf<TodoListResponse, ErrorResponse>> RemoveTodoItem(Guid todoItemId);
    Task<OneOf<TodoItemResponse, ErrorResponse>> ToggleTodoItem(Guid todoItemId);
}