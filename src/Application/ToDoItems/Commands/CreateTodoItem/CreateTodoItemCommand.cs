using Application.Models.TodoLists;
using Domain.Entities;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoItems.Commands;

public record CreateTodoItemCommand(
    string Note,
    Guid TodoListId,
    Priority Priority) : IRequest<Result<TodoListResult>>;