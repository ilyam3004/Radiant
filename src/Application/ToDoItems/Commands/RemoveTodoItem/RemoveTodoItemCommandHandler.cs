using Application.Common.Interfaces.Persistence;
using Application.Models.TodoLists;
using Domain.Common.Exceptions;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoItems.Commands.RemoveTodoItem;

public class RemoveTodoItemCommandHandler   
    : IRequestHandler<RemoveTodoItemCommand, Result<TodoListResult>>
{
    private readonly IUnitOfWork _unitOfWork;

    public RemoveTodoItemCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<TodoListResult>> Handle(
        RemoveTodoItemCommand command, 
        CancellationToken cancellationToken)
    {
        var todoItem = await _unitOfWork.TodoItems
            .GetByIdAsync(command.TodoItemId);
        if (todoItem is null)
        {
            var exception = new TodoItemNotFoundException();
            return new Result<TodoListResult>(exception);
        }
        
        _unitOfWork.TodoItems.Remove(command.TodoItemId);
        _unitOfWork.SaveChanges();
        
        var todoList = await _unitOfWork.TodoLists
            .GetTodoListByIdWithItems(todoItem.TodoListId);

        return new TodoListResult(todoList!);
    }
}