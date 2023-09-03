namespace Application.Common.Interfaces.Persistence;

public interface IRepository<TEntity> where TEntity : class
{
    Task AddAsync(TEntity entity);
    void Update(TEntity entity);
    void Remove(Guid id);
    Task<List<TEntity>> GetAll();
    Task<TEntity?> GetByIdAsync(Guid id);
}