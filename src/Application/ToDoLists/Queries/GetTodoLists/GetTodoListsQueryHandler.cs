using Application.Authentication.Services;
using Application.Common.Interfaces.Persistence;
using Application.Models.TodoLists;
using Domain.Common.Exceptions;
using Domain.Common.Messages;
using Domain.Entities;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoLists.Queries.GetTodoLists;

public class GetTodoListsQueryHandler
    : IRequestHandler<GetTodoListsQuery, Result<GetTodoListsResult>>
{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;
    
    public GetTodoListsQueryHandler(IAuthService authService, IUnitOfWork unitOfWork)
    {
        _authService = authService;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<GetTodoListsResult>> Handle(
        GetTodoListsQuery request, 
        CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(_authService.GetUserId()!);
        
        if(!await _unitOfWork.Users.UserExistsById(userId))
        {
            var exception = new UserNotFoundException();
            return new Result<GetTodoListsResult>(exception);
        }

        var userTodos = await _unitOfWork.TodoLists
            .GetUserTodoLists(userId!);
        
        SortTodoListsAndTodoItemsByDate(userTodos);

        return new GetTodoListsResult(userTodos);
    }
    
    private void SortTodoListsAndTodoItemsByDate(List<TodoList> todoLists)
    {
        todoLists.ForEach(todoList =>
        {
            todoList.TodoItems = todoList.TodoItems
                .OrderBy(todoItem => todoItem.CreatedAt).ToList();
        });

        todoLists = todoLists.OrderBy(tl => tl.CreatedAt).ToList();
    }
}