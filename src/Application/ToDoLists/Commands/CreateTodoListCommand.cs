using Application.Models.TodoLists;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoLists.Commands;

public record CreateTodoListCommand(
    string Title) : IRequest<Result<CreateTodoListResult>>;