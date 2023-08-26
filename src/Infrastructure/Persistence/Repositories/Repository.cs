namespace Infrastructure.Persistence.Repositories;

internal abstract class Repository<TEntity> 
    where TEntity : class
{
    protected readonly TodoDbContext DbContext;

    protected Repository(TodoDbContext context)
    {
        DbContext = context;
    }

    public void Add(TEntity entity)
    {
        DbContext.Set<TEntity>().Add(entity);
    }
    
    public void Update(TEntity entity)
    {
        DbContext.Set<TEntity>().Update(entity);
    }
    
    public void Remove(TEntity entity)
    {
        DbContext.Set<TEntity>().Remove(entity);
    }
    
    public List<TEntity> GetAll()
    {
        return DbContext.Set<TEntity>().ToList();
    }

    public TEntity GetById(Guid id)
    {
        return DbContext.Set<TEntity>().Find(id);
    }
}