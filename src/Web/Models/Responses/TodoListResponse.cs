namespace Web.Models.Responses;

public record TodoListResponse(
    Guid Id,
    string Title,
    List<TodoItemResponse> TodoItems,
    Guid UserId);