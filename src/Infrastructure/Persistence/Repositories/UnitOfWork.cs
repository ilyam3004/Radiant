using Application.Common.Interfaces.Persistence;

namespace Infrastructure.Persistence.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly TodoDbContext _context;
    private bool _disposed = false;
    
    public UnitOfWork(TodoDbContext context)
    {
        _context = context;
        Users = new UserRepository(context);
        Todos = new TodoListRepository(context);
    }
    
    public IUserRepository Users { get; }
    public ITodoListRepository Todos { get; }
    
    public int SaveChanges()
    {
        return _context.SaveChanges();
    }

    public void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            
            _disposed = true;
        }
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}