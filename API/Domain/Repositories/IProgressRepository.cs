using API.Domain.Entities;

namespace API.Domain.Repositories
{
    public interface IProgressRepository
    {
        Task<Progress> AddProgressAsync(Progress progress);

        Task<Progress> GetProgressByIdAsync(Guid id);

        Task DeleteProgressAsync(Guid id);

        Task<bool> HasProgressAsync(Guid lessonId);
    }
}
