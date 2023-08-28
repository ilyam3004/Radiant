namespace Domain.Common.Exceptions;

public class DuplicateEmailException : Exception
{
    public DuplicateEmailException(
        string message ="User with the same email already exists") 
        : base(message)
    { }
}