using Application.Models.TodoLists;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoLists.Queries.GetTodayTodoList;

public record GetTodayTodoListQuery(
    ) : IRequest<Result<TodoListResult>>;