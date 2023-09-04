using Microsoft.AspNetCore.Components;
using Web.Models;

namespace Web.Pages.Todo.Components;

public partial class TodoListComponent
{
    [Parameter] 
    public Models.TodoList TodoList { get; set; }

    private void RemoveTodoItem(TodoItem todoItem)
    {
        TodoList.TodoItems.Remove(todoItem);
        Console.WriteLine("TodoItem removed");
    }
}