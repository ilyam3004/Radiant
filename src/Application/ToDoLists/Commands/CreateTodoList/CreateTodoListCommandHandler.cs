using Application.Authentication.Services;
using Application.Common.Interfaces.Persistence;
using Application.Models.TodoLists;
using Domain.Common.Exceptions;
using Domain.Entities;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoLists.Commands.CreateTodoList;

public class CreateTodoListCommandHandler
    : IRequestHandler<CreateTodoListCommand, Result<CreateTodoListResult>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IAuthService _authService;
    
    public CreateTodoListCommandHandler(
        IUnitOfWork unitOfWork,IAuthService authService)
    {
        _unitOfWork = unitOfWork;
        _authService = authService;
    }
    
    public async Task<Result<CreateTodoListResult>> Handle(
        CreateTodoListCommand command, 
        CancellationToken cancellationToken)
    {
        if (await _unitOfWork.TodoLists.IsTitleExists(command.Title))
        {
            var exception = new TodoListAlreadyExistsException();
            return new Result<CreateTodoListResult>(exception);
        }

        var userId = Guid.Parse(_authService.GetUserId()!);

        var todoList = new TodoList
        {
            Id = Guid.NewGuid(),
            Title = command.Title,
            TodoItems = new List<TodoItem>(),
            UserId = userId
        };
        
        await _unitOfWork.TodoLists.AddAsync(todoList);
        _unitOfWork.SaveChanges();

        return new CreateTodoListResult(todoList);
    }
}