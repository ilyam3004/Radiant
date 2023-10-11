using Application.ToDoLists.Queries.GetTodayTodoList;
using Application.UnitTests.TestUtils.Constants;
using Domain.Entities;

namespace Application.UnitTests.TodoLists.Queries.TestUtils;

public static class GetTodayTodoListQueryUtils
{
    public static GetTodayTodoListQuery CreateGetTodayTodoListQuery() 
        => new();

    public static TodoList CreateEmptyTodayTodoList() =>
        new ()
        {
            Id = Guid.NewGuid(),
            Title = Constants.TodoList.TodayTodoListTitle,
            TodoItems = new List<TodoItem>(),
            CreatedAt = DateTime.UtcNow, 
            IsTodayTodoList = true,
            UserId = Constants.Authentication.UserIdClaim
        };

    public static User CreateUserWithWrongPasswordHash() =>
        new User
        {
            Id = Guid.NewGuid(),
            Email = Constants.Authentication.Email,
            PasswordHash = Constants.Authentication.WrongPasswordHash,
            Username = Constants.Authentication.Username
        };
}