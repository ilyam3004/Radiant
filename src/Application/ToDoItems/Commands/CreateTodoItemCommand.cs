using Application.Models.TodoLists;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoItems.Commands;

public record CreateTodoItemCommand(
    string Note,
    Guid TodoListId) : IRequest<Result<TodoListResult>>;