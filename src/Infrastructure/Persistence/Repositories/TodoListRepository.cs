using Application.Common.Interfaces.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

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
}