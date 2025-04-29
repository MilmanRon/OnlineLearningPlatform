using API.Application.DTOs.Course;
using API.Application.DTOs.Enrollment;
using API.Application.DTOs.Lesson;
using API.Application.DTOs.Progress;
using API.Application.DTOs.User;
using API.Domain.Entities;
using AutoMapper;

namespace API.Application.Mapping
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Course, CourseResponseDto>();
            CreateMap<Enrollment, EnrollmentResponseDto>();
            CreateMap<Lesson, LessonResponseDto>();
            CreateMap<Progress, ProgressResponseDto>();
            CreateMap<User, UserResponseDto>();

            CreateMap<AddCourseDto, Course>();
            CreateMap<UpdateCourseDto, Course>();

            CreateMap<AddEnrollmentDto, Enrollment>();

            CreateMap<AddProgressDto, Progress>();

            CreateMap<AddLessonDto, Lesson>();
            CreateMap<UpdateLessonDto, Lesson>();

            CreateMap<UpdateUserDto, User>();
        }
    }
}
