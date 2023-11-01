using Contracts.Models;

namespace Contracts.Requests;

public record UpdateTodoItemRequest(
    Guid Id, 
    string Note,
    bool Done,
    string TodoListId,
    Priority Priority,
    DateTime? Deadline,
    DateTime CreatedAt);