namespace Web.Models.Requests;

public record CreateTodoItemRequest(
    string Note,
    Guid TodoListId);