using API.Application.DTOs.Course;

namespace API.Application.Interfaces
{
    public interface ICourseService
    {
        Task<CourseResponseDto> AddCourseAsync(AddCourseDto addCourseDto);

        Task<CourseResponseDto> GetCourseByIdAsync(Guid id);

        Task<List<CourseResponseDto>> GetAllCoursesAsync();

        Task<CourseResponseDto> UpdateCourseAsync(UpdateCourseDto updateCourseDto);

        Task DeleteCourseAsync(Guid id);
    }
}
