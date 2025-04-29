using API.Application.DTOs.Course;
using API.Application.DTOs.Progress;
using API.Application.Interfaces;
using API.Domain.Entities;
using API.Domain.Repositories;
using AutoMapper;

namespace API.Application.Services
{
    public class ProgressService(IProgressRepository progressRepository, IMapper mapper) : IProgressService
    {
        public async Task<ProgressResponseDto> AddProgressAsync(AddProgressDto addProgressDto)
        {
            if (addProgressDto == null)
                throw new ArgumentNullException();

            if (await progressRepository.HasProgressAsync(addProgressDto.LessonId))
                throw new InvalidOperationException($"Progress already exists.");

            var progressDb = await progressRepository.AddProgressAsync(mapper.Map<Progress>(addProgressDto));

            return mapper.Map<ProgressResponseDto>(progressDb);
        }

        public async Task<ProgressResponseDto> GetProgressByIdAsync(Guid id)
        {
            var progressDb = await progressRepository.GetProgressByIdAsync(id);

            return mapper.Map<ProgressResponseDto>(progressDb);
        }

        public async Task DeleteProgressAsync(Guid id)
        {
            await progressRepository.DeleteProgressAsync(id);
        }
    }
}
