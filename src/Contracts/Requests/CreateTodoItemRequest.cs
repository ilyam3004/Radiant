namespace Contracts.Requests;

public record CreateTodoItemRequest(
    string Note,
    Guid TodoListId);