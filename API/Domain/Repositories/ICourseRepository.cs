﻿using API.Domain.Entities;

namespace API.Domain.Repositories
{
    public interface ICourseRepository
    {
        Task<Course> AddCourseAsync(Course course);

        Task<Course> GetCourseByIdAsync(Guid id);

        Task<List<Course>> GetAllCoursesAsync();

        Task<Course> UpdateCourseAsync(Course course);

        Task DeleteCourseAsync(Guid id);

        Task<bool> HasCourseAsync(Guid id);

        Task<bool> IsTitleAlreadyExists(string name);
    }
}
