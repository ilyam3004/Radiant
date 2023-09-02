namespace Contracts.Responses.TodoLists;

public record CreateTodoListResponse(
    Guid Id,
    string Title,
    List<TodoItemResponse> TodoItems,
    Guid UserId);