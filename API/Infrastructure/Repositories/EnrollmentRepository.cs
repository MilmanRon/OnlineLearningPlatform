using API.Domain.Entities;
using API.Domain.Repositories;
using API.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Repositories
{
    public class EnrollmentRepository(LearningPlatformContext context) : IEnrollmentRepository
    {
        public async Task<Enrollment> AddEnrollmentAsync(Enrollment enrollment)
        {
            if (enrollment == null)
                throw new ArgumentNullException(nameof(enrollment));

            await context.Enrollments.AddAsync(enrollment);
            await context.SaveChangesAsync();

            return enrollment;
        }

        public async Task DeleteEnrollmentAsync(Guid id)
        {
            var enrollment = await context.Enrollments.FindAsync(id);

            if (enrollment == null)
                throw new EntityNotFoundException(nameof(Enrollment), id);

            context.Enrollments.Remove(enrollment);
            await context.SaveChangesAsync();
        }

        public async Task<bool> Exists(Guid id)
        {
            return await context.Enrollments.AnyAsync(e => e.Id == id);
        }
    }
}
