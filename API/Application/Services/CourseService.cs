using API.Application.DTOs.Course;
using API.Application.Interfaces;
using API.Domain.Entities;
using API.Domain.Repositories;
using AutoMapper;

namespace API.Application.Services
{
    public class CourseService(ICourseRepository courseRepository, IMapper mapper) : ICourseService
    {
        public async Task<CourseResponseDto> AddCourseAsync(AddCourseDto addCourseDto)
        {
            if (addCourseDto == null)
                throw new ArgumentNullException();

            if (await courseRepository.HasCourseNameAsync(addCourseDto.Title))
                throw new DuplicateNameException(nameof(Course), addCourseDto.Title);

            var courseDb = await courseRepository.AddCourseAsync(mapper.Map<Course>(addCourseDto));

            return mapper.Map<CourseResponseDto>(courseDb);
        }

        public async Task<List<CourseResponseDto>> GetAllCoursesAsync()
        {
            var courses = await courseRepository.GetAllCoursesAsync();
            var coursesResponse = courses
                                    .Select(c => mapper.Map<CourseResponseDto>(c))
                                    .ToList();

            return coursesResponse;
        }

        public async Task<CourseResponseDto> GetCourseByIdAsync(Guid id)
        {
            var course = await courseRepository.GetCourseByIdAsync(id);
            return mapper.Map<CourseResponseDto>(course);
        }

        public async Task<CourseResponseDto> UpdateCourseAsync(UpdateCourseDto updateCourseDto)
        {
            if (updateCourseDto is null)
                throw new ArgumentNullException();

            var courseToUpdate = await courseRepository.GetCourseByIdAsync(updateCourseDto.Id);

            if (courseToUpdate.Title == updateCourseDto.Title)
            {
                var updatedCourse = await courseRepository.UpdateCourseAsync(mapper.Map<Course>(updateCourseDto));
                return mapper.Map<CourseResponseDto>(updatedCourse);
            }

            if (!await courseRepository.HasCourseNameAsync(updateCourseDto.Title))
            {
                var courseUpdated = await courseRepository.UpdateCourseAsync(mapper.Map<Course>(updateCourseDto));
                return mapper.Map<CourseResponseDto>(courseUpdated);
            }

            throw new DuplicateNameException(nameof(Course), updateCourseDto.Title);
        }

        public async Task DeleteCourseAsync(Guid id)
        {
            await courseRepository.DeleteCourseAsync(id);
        }
    }
}
