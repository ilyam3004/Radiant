using Microsoft.AspNetCore.Components;
using Web.Models.Response;

namespace Web.Pages.Todo;

public partial class TodoListComponent
{
    [Parameter]
    public TodoListResponse TodoList { get; set; }

    private void RemoveTodoItem(TodoItemResponse todoItem)
    {
        TodoList.TodoItems.Remove(todoItem);
        Console.WriteLine("TodoItem removed");
    }
}