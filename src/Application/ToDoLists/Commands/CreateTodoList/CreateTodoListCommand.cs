using Application.Models.TodoLists;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoLists.Commands.CreateTodoList;

public record CreateTodoListCommand(
    string Title) : IRequest<Result<TodoListResult>>;