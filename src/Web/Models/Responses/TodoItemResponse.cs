namespace Web.Models.Responses;

public record TodoItemResponse(
    Guid Id,
    string Note,
    bool Done,
    Guid TodoListId);