using Application.Common.Interfaces.Persistence;
using Application.Authentication.Services;
using Application.Models.TodoLists;
using Domain.Common.Exceptions;
using LanguageExt.Common;
using Domain.Entities;
using MediatR;

namespace Application.ToDoLists.Commands.CreateTodoList;

public class CreateTodoListCommandHandler
    : IRequestHandler<CreateTodoListCommand, Result<TodoListResult>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IAuthService _authService;
    
    public CreateTodoListCommandHandler(
        IUnitOfWork unitOfWork,IAuthService authService)
    {
        _unitOfWork = unitOfWork;
        _authService = authService;
    }
    
    public async Task<Result<TodoListResult>> Handle(
        CreateTodoListCommand command, 
        CancellationToken cancellationToken)
    {
        if (await _unitOfWork.TodoLists.IsTitleExists(command.Title))
        {
            var exception = new DuplicateTodoListException();
            return new Result<TodoListResult>(exception);
        }

        var userId = Guid.Parse(_authService.GetUserId()!);

        var todoList = new TodoList
        {
            Id = Guid.NewGuid(),
            Title = command.Title,
            TodoItems = new List<TodoItem>(),
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            IsTodayTodoList = false
        };
        
        await _unitOfWork.TodoLists.AddAsync(todoList);
        await _unitOfWork.SaveChangesAsync();

        return new TodoListResult(todoList);
    }
}