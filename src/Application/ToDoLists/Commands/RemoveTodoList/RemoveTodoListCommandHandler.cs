using Application.Authentication.Services;
using Application.Common.Behaviors;
using Application.Common.Interfaces.Persistence;
using Application.Models.TodoLists;
using Domain.Common;
using Domain.Common.Exceptions;
using Domain.Common.Messages;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoLists.Commands.RemoveTodoList;

public class RemoveTodoListCommandHandler 
    : IRequestHandler<RemoveTodoListCommand, Result<RemoveTodoListResult>>
{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;
    
    public RemoveTodoListCommandHandler(
        IAuthService authService, 
        IUnitOfWork unitOfWork)
    {
        _authService = authService;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<RemoveTodoListResult>> Handle(
        RemoveTodoListCommand command, 
        CancellationToken cancellationToken)
    {
        var todoList = await _unitOfWork.TodoLists
            .GetByIdAsync(command.TodoListId);
        if (todoList is null)
        {
            var exception = new TodoListNotFoundException();
            return new Result<RemoveTodoListResult>(exception);
        }
        
        _unitOfWork.TodoLists.Remove(todoList.Id);
        _unitOfWork.SaveChanges();
        
        return new RemoveTodoListResult(
            Success.TodoList.Removed(todoList.Title));
    }
}