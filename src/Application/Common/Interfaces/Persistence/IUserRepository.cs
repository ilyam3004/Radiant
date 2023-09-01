using Domain.Entities;

namespace Application.Common.Interfaces.Persistence;

public interface IUserRepository : IRepository<User>
{
    Task<bool> UserExists(string email);
    Task<User?> GetByEmail(string email);
}