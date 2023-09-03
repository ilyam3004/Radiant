namespace Domain.Common.Exceptions;

public class TodoItemNotFoundException : Exception
{
    public TodoItemNotFoundException(
        string message = "Todo item not found") 
        : base(message)
    { }
}