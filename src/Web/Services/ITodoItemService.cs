using Web.Models.Responses;
using Web.Models.Requests;
using OneOf;

namespace Web.Services;

public interface ITodoItemService
{
    Task<OneOf<TodoListResponse, ErrorResponse>> AddTodoItem(CreateTodoItemRequest request);
    Task<OneOf<TodoListResponse, ErrorResponse>> RemoveTodoItem(Guid todoItemId);
    Task<OneOf<TodoItemResponse, ErrorResponse>> ToggleTodoItem(Guid todoItemId);
}