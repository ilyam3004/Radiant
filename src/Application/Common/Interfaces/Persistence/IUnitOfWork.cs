namespace Application.Common.Interfaces.Persistence;

public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    ITodoListRepository TodoLists { get; }
    ITodoItemRepository TodoItems { get; }
    Task<int> SaveChangesAsync();
}