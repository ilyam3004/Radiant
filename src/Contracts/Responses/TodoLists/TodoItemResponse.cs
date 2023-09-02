namespace Contracts.Responses.TodoLists;

public record TodoItemResponse(
    Guid Id,
    string Note,
    bool Done,
    Guid TodoListId);