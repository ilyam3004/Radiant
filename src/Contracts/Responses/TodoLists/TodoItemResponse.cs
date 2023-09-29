using Contracts.Models;

namespace Contracts.Responses.TodoLists;

public record TodoItemResponse(
    Guid Id,
    string Note,
    bool Done,
    Priority Priority,
    Guid TodoListId,
    DateTime? Deadline, 
    DateTime CreatedAt);