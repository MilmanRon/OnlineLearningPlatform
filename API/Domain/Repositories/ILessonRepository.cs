using API.Domain.Entities;

namespace API.Domain.Repositories
{
    public interface ILessonRepository
    {
        Task<Lesson> AddLessonAsync(Lesson lesson);

        Task<Lesson> GetLessonByIdAsync(Guid id);

        Task<Lesson> UpdateLessonAsync(Lesson lesson);

        Task DeleteLessonAsync(Guid id);

        Task<bool> IsTitleAlreadyExists(string name);

        Task<bool> HasLessonAsync(Guid lessonId);
    }
}
