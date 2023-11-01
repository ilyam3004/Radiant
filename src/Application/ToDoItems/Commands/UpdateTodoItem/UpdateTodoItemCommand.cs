using Domain.Entities;

namespace Application.ToDoItems.Commands.UpdateTodoItem; 

public record UpdateTodoItemCommand(
    Guid Id, 
    string Note,
    bool Done,
    DateTime? Deadline,
    Priority Priority);