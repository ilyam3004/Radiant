using Domain.Entities;

namespace Application.Common.Interfaces.Persistence;

public interface ITodoItemRepository 
    : IRepository<TodoItem>
{
    
}