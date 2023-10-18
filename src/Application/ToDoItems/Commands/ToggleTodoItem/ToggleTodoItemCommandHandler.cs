using Application.Common.Interfaces.Persistence;
using Application.Models.TodoLists;
using Domain.Common.Exceptions;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoItems.Commands.ToggleTodoItem;

public class ToggleTodoItemCommandHandler : 
    IRequestHandler<ToggleTodoItemCommand, Result<TodoItemResult>>
{
    private readonly IUnitOfWork _unitUnitOfWork;

    public ToggleTodoItemCommandHandler(IUnitOfWork unitUnitOfWork)
    {
        _unitUnitOfWork = unitUnitOfWork;
    }

    public async Task<Result<TodoItemResult>> Handle(
        ToggleTodoItemCommand command, 
        CancellationToken cancellationToken)
    {
        var todoItem = await _unitUnitOfWork
            .TodoItems.GetByIdAsync(command.TodoItemId);

        if (todoItem is null)
        {
            var exception = new TodoItemNotFoundException();
            return new Result<TodoItemResult>(exception);
        }

        todoItem.Done = !todoItem.Done;

        _unitUnitOfWork.TodoItems.Update(todoItem);
        await _unitUnitOfWork.SaveChangesAsync();

        return new TodoItemResult(todoItem);
    }
}