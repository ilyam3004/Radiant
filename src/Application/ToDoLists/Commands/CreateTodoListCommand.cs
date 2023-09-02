using LanguageExt.Common;
using MediatR;

namespace Application.ToDoLists;

public record CreateTodoListCommand(
    string Title) : IRequest<Result<CreateTodoListResult>>;