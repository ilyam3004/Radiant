using Application.Common.Interfaces.Persistence;
using Application.Models.TodoLists;
using Domain.Common.Exceptions;
using LanguageExt.Common;
using Domain.Entities;
using MediatR;

namespace Application.ToDoItems.Commands.CreateTodoItem;

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
            Deadline = command.Deadline,
            CreatedAt = DateTime.UtcNow,
            TodoListId = command.TodoListId
        });

        await _unitOfWork.SaveChangesAsync();

        var todoList = await _unitOfWork.TodoLists
            .GetTodoListByIdWithItems(command.TodoListId);
        SortTodoItemsByDate(todoList!);

        if (todoList!.IsTodayTodoList)
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
            .OrderByDescending(ti => ti.CreatedAt).ToList();
}