using Application.Authentication.Services;
using Application.Common.Interfaces.Persistence;
using Application.ToDoLists.Queries.GetTodayTodoList;
using Application.UnitTests.TestUtils.Constants;
using Application.UnitTests.TestUtils.Extensions;
using Application.UnitTests.TodoLists.Queries.TestUtils;
using Application.UnitTests.TodoLists.TestUtils;
using FluentAssertions;
using Moq;

namespace Application.UnitTests.TodoLists.Queries.GetTodayTodoListQueryTests;

public class GetTodayTodoListQueryHandlerTests
{
    private readonly GetTodayTodoListQueryHandler _sut;
    private readonly Mock<IUnitOfWork> _mockUnitOfWorkService = new();
    private readonly Mock<IAuthService> _mockAuthService = new();

    public GetTodayTodoListQueryHandlerTests()
    {
        _sut = new GetTodayTodoListQueryHandler(
            _mockAuthService.Object,
            _mockUnitOfWorkService.Object);
    }

    [Fact]
    public async Task GetTodayTodoListHandler_ShouldReturnTodayTodolist()
    {
        //Arrange
        var query = GetTodayTodoListQueryUtils.CreateGetTodayTodoListQuery();
        var userId = Constants.Authentication.UserIdClaim;

        _mockAuthService.Setup(m => m.GetUserId())
            .Returns(userId.ToString());

        _mockUnitOfWorkService.Setup(m =>
                m.Users.UserExistsById(userId))
            .ReturnsAsync(true);

        _mockUnitOfWorkService.Setup(m =>
                m.TodoLists.GetUserTodayTodolist(Constants.Authentication.UserIdClaim))
            .ReturnsAsync(GetTodayTodoListQueryUtils.CreateTodayTodoList(2));

        _mockUnitOfWorkService.Setup(m =>
                m.TodoLists.GetUserTodoLists(Constants.Authentication.UserIdClaim))
            .ReturnsAsync(TodoListUtils.CreatUserTodoLists(2));

        //Act
        var result = await _sut.Handle(query, default);
        var value = result.Match(
            value => value,
            error => throw new Exception("Should not return error"));

        //Assert
        result.IsSuccess.Should().BeTrue();
        value.ValidateTodayTodoList();

        _mockUnitOfWorkService.Verify(m =>
                m.Users.UserExistsById(userId), Times.Once);

        _mockUnitOfWorkService.Verify(m =>
                m.TodoLists.GetUserTodayTodolist(userId), Times.Once);

        _mockUnitOfWorkService.Verify(m =>
            m.TodoLists.GetUserTodoLists(userId), Times.Once);
    }

    [Fact]
    public async Task GetTodayTodoListHandler_WhenUserNotExists_ShouldReturnUserNotFoundException()
    {
        //Arrange
        var query = GetTodayTodoListQueryUtils.CreateGetTodayTodoListQuery();
        var userId = Constants.Authentication.UserIdClaim;

        _mockAuthService.Setup(m => m.GetUserId())
            .Returns(userId.ToString());

        _mockUnitOfWorkService.Setup(m =>
                m.Users.UserExistsById(userId))
            .ReturnsAsync(false);

        //Act
        var result = await _sut.Handle(query, default);
        var value = result.Match(
            value => throw new Exception("Should not return value"),
            error => error);

        //Assert
        result.IsSuccess.Should().BeFalse();

        _mockUnitOfWorkService.Verify(m =>
                m.Users.UserExistsById(userId),
            Times.Once);

        _mockUnitOfWorkService.Verify(m =>
                m.TodoLists.GetUserTodayTodolist(userId),
            Times.Never);

        _mockUnitOfWorkService.Verify(m =>
            m.TodoLists.GetUserTodoLists(userId), 
            Times.Never);
    }
}