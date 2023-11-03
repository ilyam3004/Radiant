using Contracts.Models;

namespace Contracts.Requests;

public record UpdateTodoItemRequest(
    Guid Id,
    string Note,
    bool Done,
    Priority Priority,
    DateTime? Deadline);