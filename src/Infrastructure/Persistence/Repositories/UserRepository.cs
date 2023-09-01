using Application.Common.Interfaces.Persistence;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure.Persistence.Repositories;

internal sealed class UserRepository : 
    Repository<User>, IUserRepository
{
    public UserRepository(TodoDbContext context) : base(context)
    { }
    
    public async Task<bool> UserExists(string email)
    {
        return await DbContext.Users.AnyAsync(u => u.Email == email);
    }
    
    public async Task<User?> GetByEmail(string email)
    {
        return await DbContext
            .Users
            .FirstOrDefaultAsync(u => u.Email == email);
    }
}