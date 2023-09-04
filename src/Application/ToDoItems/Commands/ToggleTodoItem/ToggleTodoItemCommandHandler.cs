using Application.Common.Interfaces.Persistence;
using Application.Models.TodoLists;
using LanguageExt.Common;
using MediatR;

namespace Application.ToDoItems.Commands.ToggleTodoItem;

public class ToggleTodoItemCommanHandler : 
    IRequestHandler<ToggleTodoItemCommand, Result<TodoListResult>>
{
    private readonly IUnitOfWork _unitUnitOfWork;

    public ToggleTodoItemCommanHandler(IUnitOfWork unitUnitOfWork)
    {
        _unitUnitOfWork = unitUnitOfWork;
    }

    public Task<Result<TodoListResult>> Handle(ToggleTodoItemCommand request, CancellationToken cancellationToken)
    {
        var todoItem = 
    }
}