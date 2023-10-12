using Application.ToDoLists.Queries.GetTodayTodoList;
using Application.UnitTests.TestUtils.Constants;
using Application.UnitTests.TodoLists.TestUtils;
using Domain.Entities;

namespace Application.UnitTests.TodoLists.Queries.TestUtils;

public static class GetTodayTodoListQueryUtils
{
    public static GetTodayTodoListQuery CreateGetTodayTodoListQuery() 
        => new();

    public static TodoList CreateTodayTodoList(int todoItemsCount) =>
        new ()
        {
            Id = Guid.NewGuid(),
            Title = Constants.TodoList.TodayTodoListTitle,
            TodoItems = TodoListUtils.CreateTodoItems(todoItemsCount),
            CreatedAt = DateTime.UtcNow, 
            IsTodayTodoList = true,
            UserId = Constants.Authentication.UserIdClaim
        };
}