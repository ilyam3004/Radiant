using Contracts.Models;

namespace Contracts.Requests;

public record CreateTodoItemRequest(
    string Note,
    Guid TodoListId,
    Priority Priority,
    DateTime? Deadline);