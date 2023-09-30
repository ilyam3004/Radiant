﻿using Application.Common.Interfaces.Persistence;
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

    public async Task<bool> TodoListExists(Guid todoListId)
    {
        return await DbContext.TodoLists
            .AnyAsync(tl => tl.Id == todoListId);
    }

    public async Task<List<TodoList>> GetUserTodoLists(Guid userId)
    {
        return await DbContext.TodoLists
            .Include(tl => 
                tl.TodoItems.OrderBy(ti => ti.CreatedAt))
            .Where(tl => tl.UserId == userId).ToListAsync();
    }

    public async Task<TodoList?> GetTodoListByIdWithItems(Guid todoListId)
    {
        return await DbContext.TodoLists
            .Include(tl => tl.TodoItems)
            .FirstOrDefaultAsync(tl => tl.Id == todoListId);
    }
}