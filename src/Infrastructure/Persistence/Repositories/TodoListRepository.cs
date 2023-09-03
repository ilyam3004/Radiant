using Application.Common.Interfaces.Persistence;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure.Persistence.Repositories;

internal sealed class TodoListRepository : 
    Repository<TodoList>, ITodoListRepository
{
    public TodoListRepository(TodoDbContext context) : base(context)
    { }

    public async Task<bool> IsTitleExists(string title)
    {
        return await DbContext.TodoLists
            .AnyAsync(tl => tl.Title == title);
    }
    
    public async Task<List<TodoList>> GetUserTodoLists(Guid userId)
    {
        return await DbContext.TodoLists
            .Include(tl => tl.TodoItems)
            .Where(tl => tl.UserId == userId).ToListAsync();
    }
}