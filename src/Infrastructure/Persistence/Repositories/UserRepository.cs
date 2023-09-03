using Application.Common.Interfaces.Persistence;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure.Persistence.Repositories;

internal sealed class UserRepository : 
    Repository<User>, IUserRepository
{
    public UserRepository(TodoDbContext context) : base(context)
    { }
    
    public async Task<bool> UserExistsByEmail(string email)
    {
        return await DbContext.Users.AnyAsync(u => u.Email == email);
    }

    public async Task<bool> UserExistsById(Guid userId)
    {
        return await DbContext.Users
            .AnyAsync(u => u.Id == userId);
    }

    public async Task<User?> GetByEmail(string email)
    {
        return await DbContext
            .Users
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User?> GetUserWithTodoLists(Guid userId)
    {
        return await DbContext.Users.Include(u => u.TodoLists)
            .FirstOrDefaultAsync(u => u.Id == userId);
    }
}