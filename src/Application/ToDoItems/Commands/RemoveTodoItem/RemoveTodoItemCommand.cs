using Application.Models.TodoLists;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoItems.Commands.RemoveTodoItem;

public record RemoveTodoItemCommand(
    Guid TodoItemId) : IRequest<Result<TodoListResult>>;