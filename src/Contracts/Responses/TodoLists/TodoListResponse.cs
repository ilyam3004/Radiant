namespace Contracts.Responses.TodoLists;

public record TodoListResponse(
    Guid Id,
    string Title,
    List<TodoItemResponse> TodoItems,
    Guid UserId,
    DateTime CreatedAt,
    bool IsTodayTodoList);