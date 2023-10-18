using Application.Models.TodoLists;
using FluentAssertions;

namespace Application.UnitTests.TestUtils.Extensions;

public partial class Validations
{
    public static void ValidateTodayTodoList(this TodoListResult result)
    {
        result.TodoList.IsTodayTodoList.Should().Be(true);
        result.TodoList.TodoItems.Should().NotBeEmpty();
        result.TodoList.Title.Should().Be(Constants.Constants.TodoList.TodayTodoListTitle);
        result.TodoList.UserId.Should().Be(Constants.Constants.Authentication.UserIdClaim);
    }
}