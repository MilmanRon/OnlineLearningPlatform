using API.Application.DTOs.Enrollment;

namespace API.Application.Interfaces
{
    public interface IEnrollmentService
    {
        Task<EnrollmentResponseDto> AddEnrollmentAsync(AddEnrollmentDto addEnrollmentDto);

        Task DeleteEnrollmentAsync(Guid id);
    }
}
