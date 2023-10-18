using Application.Common.Interfaces.Persistence;
using Application.Models.TodoLists;
using Domain.Common.Exceptions;
using Domain.Entities;
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
        await _unitOfWork.SaveChangesAsync();
        
        var todoList = await _unitOfWork.TodoLists
            .GetTodoListByIdWithItems(todoItem.TodoListId);
        SortTodoItemsByDate(todoList);
        
        if (todoList.IsTodayTodoList)
            await AddItemsWithTodayDeadline(todoList);

        return new TodoListResult(todoList);
    }

    private async Task AddItemsWithTodayDeadline(TodoList todayTodolist)
    {
        var userTodoLists = await _unitOfWork.TodoLists
            .GetUserTodoLists(todayTodolist.UserId);

        var itemsToAdd = userTodoLists
            .SelectMany(todoList => todoList.TodoItems
                .Where(ti => ti.Deadline != null && ti.Deadline.Value.Date == DateTime.UtcNow.Date))
            .ToList();

        todayTodolist.TodoItems.AddRange(itemsToAdd);
        SortTodoItemsByDate(todayTodolist);
    }
    
    private void SortTodoItemsByDate(TodoList todoList)
        => todoList.TodoItems = todoList.TodoItems
            .OrderByDescending(todoItem => todoItem.CreatedAt).ToList(); 
}