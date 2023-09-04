namespace Web.Models;

public class TodoList
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public List<TodoItem> TodoItems { get; set; }
    public Guid UserId { get; set; }
}