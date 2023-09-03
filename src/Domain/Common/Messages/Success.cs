namespace Domain.Common.Messages;

public static partial class Success
{
    public static class TodoList
    {
        public static string Removed(string title) =>
            $"Todolist {title} removed successfully";
    }
}