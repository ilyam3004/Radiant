namespace Web.Models.Response;

public record TodoListResponse(
    Guid Id, 
    string Title, 
    List<TodoItemResponse> TodoItems,
    Guid UserId);