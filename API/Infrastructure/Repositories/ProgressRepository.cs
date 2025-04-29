using API.Domain.Entities;
using API.Domain.Repositories;
using API.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Repositories
{
    public class ProgressRepository(LearningPlatformContext context) : IProgressRepository
    {
        public async Task<Progress> AddProgressAsync(Progress progress)
        {
            if (progress == null)
                throw new ArgumentNullException(nameof(progress));

            await context.Progress.AddAsync(progress);
            await context.SaveChangesAsync();

            return progress;
        }

        public async Task DeleteProgressAsync(Guid id)
        {
            var progress = await context.Progress.FindAsync(id);

            if (progress == null)
                throw new KeyNotFoundException($"Progress with ID '{id}' was not found.");

            context.Progress.Remove(progress);
            await context.SaveChangesAsync();
        }

        public async Task<Progress> GetProgressByIdAsync(Guid id)
        {
            var progress = await context.Progress.FindAsync(id);

            if(progress == null)
                throw new KeyNotFoundException($"Progress with ID '{id}' was not found.");

            return progress;

        }

        public async Task<bool> HasProgressAsync(Guid lessonId)
        {
            return await context.Progress.AnyAsync(p => p.LessonId == lessonId);
        }
    }
}
