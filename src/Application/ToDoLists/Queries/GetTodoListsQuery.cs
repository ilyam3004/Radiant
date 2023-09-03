using Application.Models.TodoLists;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoLists.Queries;

public record GetTodoListsQuery(
    ) : IRequest<Result<GetTodoListsResult>>;