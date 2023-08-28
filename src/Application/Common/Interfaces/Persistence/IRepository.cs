namespace Application.Common.Interfaces.Persistence;

public interface IRepository<TEntity> where TEntity : class
{
    public void Add(TEntity entity);
    public void Update(TEntity entity);
    public void Remove(TEntity entity);
    public List<TEntity> GetAll();
    public TEntity? GetById(Guid id);
}