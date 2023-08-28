using Application.Common.Interfaces.Persistence;
using Domain.Entities;

namespace Infrastructure.Persistence.Repositories;

internal sealed class TodoListRepository : 
    Repository<TodoList>, ITodoListRepository
{
    public TodoListRepository(TodoDbContext context) : base(context)
    { }    
}