using Application.UnitTests.Authentication.Queries.TestUtils;
using Application.UnitTests.TestUtils.Extensions;
using Application.Common.Interfaces.Persistence;
using Application.Authentication.Services;
using Application.Authentication.Queries;
using System.Security.Authentication;
using Domain.Common.Exceptions;
using FluentAssertions;
using Domain.Entities;
using Moq;

namespace Application.UnitTests.Authentication.Queries.Login;

public class LoginQueryHandlerTests
{
    private readonly LoginQueryHandler _sut;
    private readonly Mock<IAuthService> _mockAuthService;
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;

    public LoginQueryHandlerTests()
    {
        _mockAuthService = new Mock<IAuthService>();
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _sut = new LoginQueryHandler(_mockAuthService.Object, _mockUnitOfWork.Object);
    }

    [Fact]
    public async Task LoginQueryHandler_WhenQueryIsValid_ShouldAuthenticateUserAndReturnResult()
    {
        //Arrange
        var query = LoginQueryUtils.CreateLoginQuery();

        _mockUnitOfWork.Setup(m => m.Users.GetByEmail(query.Email))
            .ReturnsAsync(LoginQueryUtils.CreateUserWithCorrectPasswordHash());

        //Act
        var result = await _sut.Handle(query, default);
        var value = result.Match(
            value => value,
            error => throw new Exception("Should not return error"));

        //Assert
        result.IsSuccess.Should().BeTrue();
        value.ValidateCreatedFrom(query);

        _mockUnitOfWork.Verify(m => m.Users.GetByEmail(query.Email),
            Times.Once);
        _mockAuthService.Verify(m => m.Login(query),
            Times.Once);
    }

    [Fact]
    public async Task LoginQueryHandler_WhenQueryIsNotValid_ShouldReturnInvalidCredentialsExceptions()
    {
        //Arrange
        var query = LoginQueryUtils.CreateLoginQuery();

        _mockUnitOfWork.Setup(m => m.Users.GetByEmail(query.Email))
            .ReturnsAsync(LoginQueryUtils.CreateUserWithWrongPasswordHash());

        //Act
        var result = await _sut.Handle(query, default);
        var value = result.Match(
            value => throw new Exception("Should not return value"),
            error => error);

        //Assert
        result.IsFaulted.Should().BeTrue();
        value.Should().BeOfType<InvalidCredentialException>();
        
        _mockUnitOfWork.Verify(m =>
            m.Users.GetByEmail(query.Email), Times.Once);
        _mockAuthService.Verify(m =>
            m.Login(query), Times.Never);
    }

    [Fact]
    public async Task LoginQueryHandler_WhenUserIsNotExists_ShouldReturnNotFoundException()
    {
        //Arrange
        var query = LoginQueryUtils.CreateLoginQuery();

        _mockUnitOfWork.Setup(m => m.Users.GetByEmail(query.Email))
            .ReturnsAsync(null as User);

        //Act
        var result = await _sut.Handle(query, default);
        var value = result.Match(
            value => throw new Exception("Should not return value"),
            error => error);

        //Assert
        result.IsFaulted.Should().BeTrue();
        value.Should().BeOfType<UserNotFoundException>();

        _mockUnitOfWork.Verify(m =>
            m.Users.GetByEmail(query.Email), Times.Once);
        _mockAuthService.Verify(m =>
            m.Login(query), Times.Never);
    }
}