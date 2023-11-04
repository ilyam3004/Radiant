using Application.Common.Interfaces.Persistence;
using Application.Models.TodoLists;
using Domain.Common.Exceptions;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoItems.Commands.UpdateTodoItem;

public class UpdateTodoItemCommandHandler
    : IRequestHandler<UpdateTodoItemCommand, Result<TodoItemResult>>
{
    private readonly IUnitOfWork _unitOfWork;

    public UpdateTodoItemCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<TodoItemResult>> Handle(
        UpdateTodoItemCommand command,
        CancellationToken cancellationToken)
    {
        var todoItem = await _unitOfWork.TodoItems
                .GetByIdAsync(command.Id);

        if (todoItem is null)
        {
            var exception = new TodoItemNotFoundException();
            return new Result<TodoItemResult>(exception);
        }

        todoItem.Note = command.Note;
        todoItem.Priority = command.Priority;
        todoItem.Deadline = command.Deadline;
        todoItem.Done = command.Done;

        await _unitOfWork.SaveChangesAsync();

        return new TodoItemResult(todoItem);
    }
}