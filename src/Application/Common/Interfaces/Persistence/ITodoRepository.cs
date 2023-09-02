using Domain.Entities;

namespace Application.Common.Interfaces.Persistence;

public interface ITodoListRepository : IRepository<TodoList>
{
    Task<bool> IsTitleExists(string title);
}