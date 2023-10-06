namespace Domain.Entities;

public class TodoList
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public List<TodoItem> TodoItems { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
}