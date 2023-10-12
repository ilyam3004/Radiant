using Application.UnitTests.TestUtils.Constants;
using Domain.Entities;

namespace Application.UnitTests.TodoLists.TestUtils;

public static class TodoListUtils
{
    private static readonly Random Random = new();

    public static List<TodoList> CreatUserTodoLists(int todoListCount = 1) =>
        Enumerable.Range(0, todoListCount)
            .Select(CreateTodoList)
            .ToList();

    public static TodoList CreateTodoList(int index = 1) =>
        new()
        {
            Id = Guid.NewGuid(),
            UserId = Constants.Authentication.UserIdClaim,
            Title = Constants.TodoList.TodoListNameFromGivenIndex(index),
            TodoItems = CreateTodoItems(index + 1),
            CreatedAt = DateTime.UtcNow,
            IsTodayTodoList = false,
        };

    public static List<TodoItem> CreateTodoItems(int todoItemsCount)
        => Enumerable.Range(0, todoItemsCount).Select(CreateTodoItem).ToList();

    private static TodoItem CreateTodoItem(int index = 1)
        => new()
        {
            Id = Guid.NewGuid(),
            Note = Constants.TodoItem.CreateTodoItemNoteFromGivenIndex(index),
            Done = new Random().Next(2) == 1,
            Deadline = Random.Next(2) == 1 ? DateTime.UtcNow : null,
            Priority = (Priority) (Enum.GetValues(typeof(Priority))
                .GetValue(Random.Next(3))!),
            CreatedAt = DateTime.UtcNow,
            TodoListId = Constants.TodoList.TodoListId,
        };
}