using API.Application.DTOs.Enrollment;
using API.Application.DTOs.Progress;
using API.Application.DTOs.User;
using API.Domain.Entities;

namespace API.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserResponseDto> GetUserByIdAsync(Guid id);

        Task<UserResponseDto> UpdateUserAsync(UpdateUserDto updatedUser);

        Task DeleteUserAsync(Guid id);

        Task<List<EnrollmentResponseDto>> GetUserEnrollments(Guid id);

        Task<EnrollmentResponseDto> EnrollUser(AddEnrollmentDto addEnrollmentDto, Guid id);

        Task<ProgressResponseDto> AddProgress(AddProgressDto addProgressDto, Guid id);

        Task<List<ProgressResponseDto>> GetUserProgress(Guid id);



    }
}
