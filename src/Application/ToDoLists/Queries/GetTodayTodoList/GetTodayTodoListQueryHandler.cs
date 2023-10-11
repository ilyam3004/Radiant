using Application.Common.Interfaces.Persistence;
using Application.Authentication.Services;
using Application.Models.TodoLists;
using Domain.Common.Exceptions;
using LanguageExt.Common;
using Domain.Entities;
using MediatR;

namespace Application.ToDoLists.Queries.GetTodayTodoList;

public class GetTodayTodoListQueryHandler : IRequestHandler<GetTodayTodoListQuery,
    Result<TodoListResult>>
{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;

    public GetTodayTodoListQueryHandler(IAuthService authService, IUnitOfWork unitOfWork)
    {
        _authService = authService;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<TodoListResult>> Handle(
        GetTodayTodoListQuery request,
        CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(_authService.GetUserId()!);

        if (!await _unitOfWork.Users.UserExistsById(userId))
        {
            var exception = new UserNotFoundException();
            return new Result<TodoListResult>(exception);
        }

        var todayTodolist = await _unitOfWork.TodoLists
            .GetUserTodayTodolist(userId);

        AddTodoItemsWithTodayDeadline(todayTodolist);

        _unitOfWork.SaveChanges();

        return new TodoListResult(todayTodolist);
    }

    private async void AddTodoItemsWithTodayDeadline(TodoList todayTodolist)
    {
        var userTodoLists = await _unitOfWork.TodoLists
            .GetUserTodoLists(todayTodolist.UserId);

        foreach (var todoItem in userTodoLists.SelectMany(todoList => todoList.TodoItems
                     .Where(ti => ti.Deadline == DateTime.UtcNow.Date)))
        {
            todayTodolist.TodoItems.Add(todoItem);
        }
    }
}