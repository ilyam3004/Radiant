using Application.Models.TodoLists;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoItems.Commands.ToggleTodoItem;

public record ToggleTodoItemCommand(
    Guid TodoItemId) : IRequest<Result<TodoItemResult>>;