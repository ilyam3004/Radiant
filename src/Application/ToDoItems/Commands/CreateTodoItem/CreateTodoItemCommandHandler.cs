using Application.Common.Interfaces.Persistence;
using Application.Models.TodoLists;
using Domain.Common.Exceptions;
using LanguageExt.Common;
using Domain.Entities;
using MediatR;

namespace Application.ToDoItems.Commands;

public class CreateTodoItemCommandHandler 
    : IRequestHandler<CreateTodoItemCommand, Result<TodoListResult>>
{
    private readonly IUnitOfWork _unitOfWork;

    public CreateTodoItemCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<TodoListResult>> Handle(
        CreateTodoItemCommand command, 
        CancellationToken cancellationToken)
    {
        if (!await _unitOfWork.TodoLists.TodoListExists(command.TodoListId))
        {
            var exception = new TodoListNotFoundException();
            return new Result<TodoListResult>(exception);
        }

        await _unitOfWork.TodoItems.AddAsync(new TodoItem
        {
            Id = Guid.NewGuid(),
            Note = command.Note,
            Done = false,
            Priority = command.Priority,
            TodoListId = command.TodoListId
        });
        _unitOfWork.SaveChanges();

        var todoList = await _unitOfWork.TodoLists
            .GetTodoListByIdWithItems(command.TodoListId);
        
        return new TodoListResult(todoList!);
    }
}