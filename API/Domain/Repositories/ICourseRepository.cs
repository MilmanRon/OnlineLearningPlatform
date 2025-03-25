using API.Application.DTOs.Course;
using API.Domain.Entities;

namespace API.Domain.Repositories
{
    public interface ICourseRepository
    {
        Task<Course> AddCourseAsync(Course course);

        Task<Course> GetCourseByIdAsync(Guid id);

        Task<List<Course>> GetAllCoursesAsync();

        Task<Course> UpdateCourseAsync(Course course);

        Task DeleteCourseAsync(Guid id);

        Task<bool> ExistsAsync(Guid id);

        Task<bool> HasCourseNameAsync(string name);
    }
}
