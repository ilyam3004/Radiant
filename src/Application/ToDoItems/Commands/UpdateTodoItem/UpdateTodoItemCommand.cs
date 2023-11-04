using Application.Models.TodoLists;
using Domain.Entities;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoItems.Commands.UpdateTodoItem;

public record UpdateTodoItemCommand(
    Guid Id,
    string Note,
    bool Done,
    DateTime? Deadline,
    Priority Priority) : IRequest<Result<TodoItemResult>>;