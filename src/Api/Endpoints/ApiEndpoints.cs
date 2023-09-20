using System.Security.Authentication;
using Domain.Common.Exceptions;
using FluentValidation;

namespace Api.Endpoints;

public static class ApiEndpoints  
{
    public static IResult Problem(Exception ex)
    {
        return ex switch
        {
            ValidationException => ValidationProblem(ex),
            DuplicateEmailException => Results.Problem(ex.Message, statusCode: StatusCodes.Status400BadRequest),
            DuplicateTodoListException => Results.Problem(ex.Message, statusCode: StatusCodes.Status400BadRequest),
            UnauthorizedAccessException => Results.Problem(ex.Message, statusCode: StatusCodes.Status401Unauthorized),
            UserNotFoundException => Results.Problem(ex.Message, statusCode: StatusCodes.Status404NotFound),
            InvalidCredentialException => Results.Problem(ex.Message, statusCode: StatusCodes.Status401Unauthorized),
            TodoItemNotFoundException => Results.Problem(ex.Message, statusCode: StatusCodes.Status404NotFound),
            TodoListNotFoundException => Results.Problem(ex.Message, statusCode: StatusCodes.Status404NotFound),
            _ => Results.StatusCode(StatusCodes.Status500InternalServerError)
        };
    }

    private static IResult ValidationProblem(Exception ex)
    {
        var validationException = (ValidationException) ex;

        var validationErrors = new Dictionary<string, string[]>();
        
        foreach (var error in validationException.Errors)
            validationErrors.Add(error.PropertyName, 
                new[]{ error.ErrorMessage });
        
        return Results.ValidationProblem(
            validationErrors);
    }
}