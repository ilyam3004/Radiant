using Web.Models;

namespace Web.Pages.Todo;

public partial class Todo
{
    private string newTask = "";

    private List<TodoList> todoLists = new()
    {
        new()
        {
            Title = "Todo List 1",
            TodoItems = new List<TodoItem>
            {
                new()
                {
                    Note = "Tasl 1",
                    Done = true
                },
                new()
                {
                    Note = "Tasl 1",
                    Done = true
                }
            }
        },
        new()
        {
            Title = "Todo List 1",
            TodoItems = new List<TodoItem>
            {
                new()
                {
                    Note = "Tasl 1",
                    Done = false
                },
                new()
                {
                    Note = "Tasl 1",
                    Done = true
                }
            }
        }
    };
}