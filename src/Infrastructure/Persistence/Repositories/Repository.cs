using Application.Common.Interfaces.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

internal class Repository<TEntity> : 
    IRepository<TEntity> where TEntity : class
{
    protected readonly TodoDbContext DbContext;

    protected Repository(TodoDbContext context)
    {
        DbContext = context;
    }

    public async Task AddAsync(TEntity entity)
    {
        await DbContext.Set<TEntity>().AddAsync(entity);
    }
    
    public void Update(TEntity entity)
    {
        DbContext.Set<TEntity>().Update(entity);
    }
    
    public void Remove(Guid id)
    {
        var entity = DbContext.Set<TEntity>().Find(id);
        DbContext.Set<TEntity>().Remove(entity!);
    }
    
    public async Task<List<TEntity>> GetAll()
    {
        return await DbContext.Set<TEntity>().ToListAsync();
        
    }

    public async Task<TEntity?> GetByIdAsync(Guid id)
    {
        return await DbContext.Set<TEntity>().FindAsync(id);
    }
}