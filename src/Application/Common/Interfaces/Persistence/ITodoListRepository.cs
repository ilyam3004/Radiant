using Domain.Entities;

namespace Application.Common.Interfaces.Persistence;

public interface ITodoListRepository : IRepository<TodoList>
{
    Task<bool> IsTitleExists(string title);
    Task<bool> TodoListExists(Guid todoListId);
    Task<List<TodoList>> GetUserTodoLists(Guid userId);
    Task<TodoList> GetUserTodayTodolist(Guid userId);
    Task<TodoList?> GetTodoListByIdWithItems(Guid todoListId);
}