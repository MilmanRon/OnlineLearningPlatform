using API.Application.DTOs.Progress;

namespace API.Application.Interfaces
{
    public interface IProgressService
    {
        Task<ProgressResponseDto> AddProgressAsync(AddProgressDto addProgressDto);

        Task<ProgressResponseDto> GetProgressByIdAsync(Guid id);

        Task DeleteProgressAsync(Guid id);
    }
}
