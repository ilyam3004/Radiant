namespace Application.UnitTests.TestUtils.Constants;

public partial class Constants
{
    public static class TodoList
    {
        public const string TodayTodoListTitle = "Today";
        public const string TodoListTitle = "TodoList";
        public static readonly Guid TodoListId = Guid.NewGuid();
        public static string TodoListNameFromGivenIndex(int index)
            => $"{TodoListTitle} {index}"; 
    }
}