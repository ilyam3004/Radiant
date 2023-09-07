namespace Web.Models.Response;

public record TodoItemResponse(
    Guid Id,
    string Note, 
    bool Done,
    Guid TodoListId);