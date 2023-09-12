namespace Domain.Common.Exceptions;

public class DuplicateTodoListException : Exception
{
    public DuplicateTodoListException(
        string message = "Todo list with the same name already exists")
        : base(message)
    { }
}