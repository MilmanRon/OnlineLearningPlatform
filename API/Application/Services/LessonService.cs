using API.Application.DTOs.Lesson;
using API.Application.Interfaces;
using API.Domain.Entities;
using API.Domain.Repositories;
using AutoMapper;

namespace API.Application.Services
{
    public class LessonService(ILessonRepository lessonRepository, IMapper mapper) : ILessonService
    {
        public async Task<LessonResponseDto> AddLessonAsync(AddLessonDto addLessonDto)
        {
            if (addLessonDto == null)
                throw new ArgumentNullException();

            var lessonDb = await lessonRepository.AddLessonAsync(mapper.Map<Lesson>(addLessonDto));

            return mapper.Map<LessonResponseDto>(lessonDb);
        }

        public async Task<LessonResponseDto> GetLessonByIdAsync(Guid id)
        {
            var lessonDb = await lessonRepository.GetLessonByIdAsync(id);

            return mapper.Map<LessonResponseDto>(lessonDb);
        }

        public async Task<LessonResponseDto> UpdateLessonAsync(UpdateLessonDto updateLessonDto)
        {
            if (updateLessonDto == null)
                throw new ArgumentNullException();

            var lessonDb = await lessonRepository.UpdateLessonAsync(mapper.Map<Lesson>(updateLessonDto));

            return mapper.Map<LessonResponseDto>(lessonDb);
        }

        public async Task DeleteLessonAsync(Guid id)
        {
            await lessonRepository.DeleteLessonAsync(id);
        }
    }
}
