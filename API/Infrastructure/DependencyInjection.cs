	using API.Application.Interfaces;
using API.Domain.Repositories;
using API.Infrastructure.Authentication;
using API.Infrastructure.Data;
using API.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddControllers();
            services.AddDbContext<LearningPlatformContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<ILessonRepository, LessonRepository>();
            services.AddScoped<IEnrollmentRepository, EnrollmentRepository>();
            services.AddScoped<IProgressRepository, ProgressRepository>();
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}
