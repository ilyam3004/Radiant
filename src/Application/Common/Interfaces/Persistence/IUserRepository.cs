using Domain.Entities;

namespace Application.Common.Interfaces.Persistence;

public interface IUserRepository : IRepository<User>
{
    bool UserExists(string email);
}