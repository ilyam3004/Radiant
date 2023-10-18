namespace Application.UnitTests.TestUtils.Constants;

public partial class Constants
{
    public static class TodoItem
    {
        public const string TodoItemNote = "TodoItem Note";
        public static string CreateTodoItemNoteFromGivenIndex(int index)
            => $"{TodoItemNote} {index}";
    }
}