namespace Domain.Common.Exceptions;

public class TodoListNotFoundException : Exception
{
    public TodoListNotFoundException(
        string message = "TodoList not found")
        : base(message)
    { }
}