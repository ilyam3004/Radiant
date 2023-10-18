using Application.Models.TodoLists;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoLists.Queries.GetTodoLists;

public record GetTodoListsQuery(
    ) : IRequest<Result<GetTodoListsResult>>;