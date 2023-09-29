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
        TodoLists = new TodoListRepository(context);
        TodoItems = new TodoItemRepository(context);
    }
    
    public IUserRepository Users { get; }
    public ITodoListRepository TodoLists { get; }
    public ITodoItemRepository TodoItems { get; }
    
    public int SaveChanges()
    {
        return _context.SaveChanges();
    }

    private void Dispose(bool disposing)
    {
        if (_disposed) return;
        if (disposing)
        {
            _context.Dispose();
        }
            
        _disposed = true;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}