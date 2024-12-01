namespace SB.Government.Domain;

public interface IGovernmentEntityRepository
{
    Task<IEnumerable<GovernmentEntity>> GetAllAsync();
    Task<GovernmentEntity?> GetByIdAsync(int id);
    Task AddAsync(GovernmentEntity entity);
    Task UpdateAsync(GovernmentEntity entity);
    Task DeleteAsync(int id);

}