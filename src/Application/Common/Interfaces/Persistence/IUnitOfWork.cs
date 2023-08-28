namespace Application.Common.Interfaces.Persistence;

public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    ITodoListRepository Todos { get; }
    int SaveChanges();
}