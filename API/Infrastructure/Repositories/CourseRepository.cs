using API.Domain.Entities;
using API.Domain.Repositories;
using API.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Repositories
{
    public class CourseRepository(LearningPlatformContext context) : ICourseRepository
    {
        public async Task<Course> AddCourseAsync(Course course)
        {
            if (course == null)
                throw new ArgumentNullException(nameof(course));

            await context.Courses.AddAsync(course);
            await context.SaveChangesAsync();

            return course;
        }

        public async Task<List<Course>> GetAllCoursesAsync()
        {
            return await context.Courses.ToListAsync();
        }

        public async Task DeleteCourseAsync(Guid id)
        {
            var course = await context.Courses.FindAsync(id);

            if (course == null)
                throw new EntityNotFoundException(nameof(Course), id);

            context.Courses.Remove(course);
            await context.SaveChangesAsync();
        }

        public async Task<Course> GetCourseByIdAsync(Guid id)
        {
            var courseWithLessons = await context.Courses
                .Include(c => c.Lessons)
                .SingleOrDefaultAsync(c => c.Id == id);

            if (courseWithLessons == null)
                throw new EntityNotFoundException(nameof(Course), id);

            return courseWithLessons;

        }

        public async Task<Course> UpdateCourseAsync(Course updatedCourse)
        {
            if (updatedCourse is null)
                throw new ArgumentNullException(nameof(updatedCourse));

            var currentCourse = await context.Courses.FindAsync(updatedCourse.Id);

            if (currentCourse == null)
                throw new EntityNotFoundException(nameof(Course), updatedCourse.Id);

            currentCourse.Title = updatedCourse.Title;
            currentCourse.Description = updatedCourse.Description;

            await context.SaveChangesAsync();

            return updatedCourse;
        }

        public async Task<bool> isExistsAsync(Guid id)
        {
            return await context.Courses.AnyAsync(c => c.Id == id);
        }

        public async Task<bool> HasCourseNameAsync(string name)
        {
            return await context.Courses.AnyAsync(c => c.Title == name);
        }

    }
}
