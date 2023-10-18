using Application.Models.TodoLists;
using Domain.Entities;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoItems.Commands.CreateTodoItem;

public record CreateTodoItemCommand(
    string Note,
    Guid TodoListId,
    Priority Priority,
    DateTime? Deadline) : IRequest<Result<TodoListResult>>;