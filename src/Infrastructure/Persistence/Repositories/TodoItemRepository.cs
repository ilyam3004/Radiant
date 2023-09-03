using Application.Common.Interfaces.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

internal class TodoItemRepository 
    : Repository<TodoItem>, ITodoItemRepository
{
    public  TodoItemRepository(TodoDbContext context) 
        : base(context)
    { }
}