namespace Domain.Common.Exceptions;

public class TodoListAlreadyExistsException : Exception
{
    public TodoListAlreadyExistsException(
        string message = "Todo list with the same name already exists")
        : base(message)
    { }
}