using Application.UnitTests.Authentication.Commands.TestUtils;
using Application.UnitTests.TestUtils.Extensions;
using Application.Common.Interfaces.Persistence;
using Application.Authentication.Commands;
using Domain.Common.Exceptions;
using Exception = System.Exception;
using Domain.Entities;
using FluentAssertions;
using Moq;

namespace Application.UnitTests.Authentication.Commands.Register;

public class RegisterCommandHandlerTests
{
    private readonly RegisterCommandHandler _sut;
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    
    public RegisterCommandHandlerTests()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _sut = new RegisterCommandHandler(_mockUnitOfWork.Object);
    }
    
    [Fact]
    public async Task RegisterCommandHandler_WhenCommandIsValid_ShouldCreateUserAndReturnResult()
    {
        //Arrange
        var registerCommand = RegisterCommandUtils.CreateRegisterCommand();
        _mockUnitOfWork.Setup(m => m.Users.UserExists(
            registerCommand.Email)).Returns(false);
        
        //Act
        var result = await _sut.Handle(registerCommand, default);
        var value = result.Match(
            value => value,
            error => throw new Exception("Should not return error"));

        //Assert
        result.IsSuccess.Should().BeTrue();
        value.ValidateCreatedFrom(registerCommand);
        _mockUnitOfWork.Verify(m => 
            m.Users.Add(It.IsAny<User>()));
    }

    [Fact]
    public async Task RegisterCommandHandler_ShouldReturnErrorResult_WhenUserExists()
    {
        //Arrange
        var registerCommand = RegisterCommandUtils.CreateRegisterCommand();

        _mockUnitOfWork.Setup(m => 
            m.Users.UserExists(registerCommand.Email)).
            Returns(true);
        
        //Act
        var result = await _sut.Handle(registerCommand, default);
        var value = result.Match(
            value => 
                throw new Exception("Should not return value"),
            error => error);

        //Assert
        result.IsFaulted.Should().BeTrue();
        value.Should().BeOfType<DuplicateEmailException>();
        _mockUnitOfWork.Verify(m => 
            m.Users.Add(It.IsAny<User>()), Times.Never);
    }
}