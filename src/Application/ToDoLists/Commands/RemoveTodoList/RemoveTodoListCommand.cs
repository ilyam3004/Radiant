using Application.Models.TodoLists;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoLists.Commands.RemoveTodoList;

public record RemoveTodoListCommand(
        Guid TodoListId) : IRequest<Result<RemoveTodoListResult>>;