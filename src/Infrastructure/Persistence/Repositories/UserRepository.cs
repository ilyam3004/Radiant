using Application.Common.Interfaces.Persistence;
using Domain.Entities;

namespace Infrastructure.Persistence.Repositories;

internal sealed class UserRepository : 
    Repository<User>, IUserRepository
{
    public UserRepository(TodoDbContext context) : base(context)
    { }
    
    public bool UserExists(string email)
    {
        return DbContext.Users.Any(u => u.Email == email);
    }
}