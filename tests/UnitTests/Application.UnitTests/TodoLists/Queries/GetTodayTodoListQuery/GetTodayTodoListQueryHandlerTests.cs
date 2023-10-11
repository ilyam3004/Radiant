using Application.Authentication.Services;
using Application.Common.Interfaces.Persistence;
using Application.Models.Authentication;
using Application.ToDoLists.Queries.GetTodayTodoList;
using Application.UnitTests.TestUtils.Constants;
using Application.UnitTests.TodoLists.Queries.TestUtils;
using Application.UnitTests.TodoLists.TestUtils;
using FluentAssertions;
using Moq;

namespace TodayTodoListQuery;

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
    public async Task LoginQueryHandler_WhenQueryIsValid_ShouldAuthenticateUserAndReturnResult()
    {
        //Arrange
        var query = GetTodayTodoListQueryUtils.CreateGetTodayTodoListQuery();

        _mockAuthService.Setup(m => m.GetUserId())
            .Returns(Constants.Authentication.UserIdClaim.ToString);

        _mockUnitOfWorkService.Setup(m => m.Users.UserExistsById(
                Constants.Authentication.UserIdClaim))
            .ReturnsAsync(true);

        _mockUnitOfWorkService.Setup(m => m.TodoLists.GetUserTodayTodolist(
                Constants.Authentication.UserIdClaim))
            .ReturnsAsync(GetTodayTodoListQueryUtils.CreateEmptyTodayTodoList());

        _mockUnitOfWorkService.Setup(m => m.TodoLists.GetUserTodoLists(
                Constants.Authentication.UserIdClaim))
            .ReturnsAsync(TodoListUtils.CreatUserTodoLists());

        //Act
        var result = await _sut.Handle(query, default);
        var value = result.Match(
            value => value,
            error => throw new Exception("Should not return error"));

        //Assert
        result.IsSuccess.Should().BeTrue();
        // value.ValidateCreatedFrom(query);

        _mockUnitOfWork.Verify(m => m.Users.GetByEmail(query.Email),
            Times.Once);
        _mockUnitOfWorkService.Verify(m => m.Login(It.IsAny<AuthRequest>()),
            Times.Once);
    }
}