

using System.Text.Json;
using Microsoft.Extensions.Configuration;
using SB.Government.Domain;

namespace SB.Government.Infrastructure.Repositories;

public class FileDataGovernmentEntityRepository : IGovernmentEntityRepository
{
    private readonly string _fileData;

    public FileDataGovernmentEntityRepository(IConfiguration configuration)
    {

        _fileData = configuration["DatabaseSettings:GovernmentFilePath"];

        if (!File.Exists(_fileData))
        {
            Directory.CreateDirectory("Data");
            File.WriteAllText(_fileData, "[]");
        }
    }


    public async Task<IEnumerable<GovernmentEntity>> GetAllAsync()
    {
        var jsonData = await File.ReadAllTextAsync(_fileData);
        return JsonSerializer.Deserialize<IEnumerable<GovernmentEntity>>(jsonData) ?? new List<GovernmentEntity>();
    }

    public async Task<GovernmentEntity?> GetByIdAsync(int id)
    {
        var entities = await GetAllAsync();
        return entities.FirstOrDefault(e => e.Id == id);
    }
    public async Task AddAsync(GovernmentEntity entity)
    {
        var entities = (await GetAllAsync()).ToList();
        entity.Id = entities.Any() ? entities.Max(e => e.Id) + 1 : 1;
        entities.Add(entity);
        await SaveEntityAsync(entities);
    }

    public async Task UpdateAsync(GovernmentEntity entity)
    {
         var entities = (await GetAllAsync()).ToList();
        var existingEntity = entities.FirstOrDefault(e => e.Id == entity.Id);
        if (existingEntity == null) return;

        existingEntity.Name = entity.Name;
        existingEntity.Description = entity.Description;
        existingEntity.Website = entity.Website;
        existingEntity.Address = entity.Address;
        existingEntity.Phone = entity.Phone;
        existingEntity.Email = entity.Email;

        await SaveEntityAsync(entities);
    }
    public async Task DeleteAsync(int id)
    {
        var entities = (await GetAllAsync()).ToList();
        var entityToRemove = entities.FirstOrDefault(e => e.Id == id);
        if (entityToRemove == null) return;

        entities.Remove(entityToRemove);
        await SaveEntityAsync(entities);
    }

    private async Task SaveEntityAsync(IEnumerable<GovernmentEntity> entities)
    {
        var jsonData = JsonSerializer.Serialize(entities);
        await File.WriteAllTextAsync(_fileData, jsonData);
    }
}