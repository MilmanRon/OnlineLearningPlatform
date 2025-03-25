using API.Application.DTOs.Lesson;

namespace API.Application.Interfaces
{
    public interface ILessonService
    {
        Task<LessonResponseDto> AddLessonAsync(AddLessonDto addLessonDto);

        Task<LessonResponseDto> GetLessonByIdAsync(Guid id);

        Task<LessonResponseDto> UpdateLessonAsync(UpdateLessonDto updateLessonDto);

        Task DeleteLessonAsync(Guid id);
    }
}
