using API.Application.DTOs.Course;
using API.Application.DTOs.Lesson;
using API.Application.DTOs.User;
using API.Application.Interfaces;
using API.Application.Services;
using API.Application.Validators.CourseValidators;
using API.Application.Validators.LessonValidators;
using API.Application.Validators.UserValidators;
using FluentValidation;
using FluentValidation.AspNetCore;

namespace API.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


            services.AddFluentValidationAutoValidation();
            //services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();
            //services.AddScoped<IValidator<LoginUserDto>, LoginUserDtoValidator>();
            //services.AddScoped<IValidator<UpdateUserDto>, UpdateUserDtoValidator>();


            //services.AddScoped<IValidator<AddCourseDto>, AddCourseDtoValidator>();
            //services.AddScoped<IValidator<UpdateCourseDto>, UpdateCourseDtoValidator>();

            //services.AddScoped<IValidator<AddLessonDto>, AddLessonDtoValidator>();
            //services.AddScoped<IValidator<UpdateLessonDto>, UpdateLessonDtoValidator>();

            services.AddScoped<AuthService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ILessonService, LessonService>();
            services.AddScoped<IEnrollmentService, EnrollmentService>();
            services.AddScoped<IProgressService, ProgressService>();

            return services;
        }
    }
}
