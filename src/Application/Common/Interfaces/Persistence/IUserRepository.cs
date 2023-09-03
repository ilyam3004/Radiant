using Domain.Entities;

namespace Application.Common.Interfaces.Persistence;

public interface IUserRepository : IRepository<User>
{
    Task<bool> UserExistsByEmail(string email);
    Task<bool> UserExistsById(Guid userId);
    Task<User?> GetByEmail(string email);
    Task<User?> GetUserWithTodoLists(Guid userId);
}