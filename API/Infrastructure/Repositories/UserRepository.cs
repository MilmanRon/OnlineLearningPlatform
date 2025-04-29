using API.Domain.Entities;
using API.Domain.Repositories;
using API.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Repositories
{
    public class UserRepository(LearningPlatformContext context) : IUserRepository
    {
        public async Task<User> AddUserAsync(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            return user;
        }

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            var user = await context.Users
                .Include(u => u.Enrollments)
                .Include(u => u.Progress)
                .SingleOrDefaultAsync(u => u.Id == id);

            if (user == null)
                throw new KeyNotFoundException($"User with ID '{id}' was not found.");

            return user;
        }

        public async Task<User> UpdateUserAsync(User updatedUser)
        {
            if(updatedUser is null)
                throw new ArgumentNullException(nameof(updatedUser));

            var currentUser = await context.Users.FindAsync(updatedUser.Id);

            if (currentUser is null)
                throw new KeyNotFoundException($"Course with ID '{updatedUser.Id}' was not found.");

            currentUser.Name = updatedUser.Name;
            currentUser.Email = updatedUser.Email;

            await context.SaveChangesAsync();

            return currentUser;
        }

        public async Task DeleteUserAsync(Guid id)
        {
            var user = await context.Users.FindAsync(id);

            if (user == null)
                throw new KeyNotFoundException($"User with ID '{id}' was not found.");

            context.Users.Remove(user);
            await context.SaveChangesAsync();
        }


        public async Task<User?> GetUserByEmailAsync(string email)
        {
            if (email is null)
                throw new ArgumentNullException(nameof(String));

            var user = await context.Users.SingleOrDefaultAsync(u => u.Email == email);

            return user;
        }

        public async Task<List<Enrollment>> GetUserEnrollmentsAsync(Guid id)
        {
            if (await context.Users.Include(u => u.Enrollments).SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"User with ID '{id}' was not found.");

            return user!.Enrollments.ToList();
        }

        public async Task<bool> isAlreadyEnrolledAsync(Guid courseId, Guid id)
        {
            if (await context.Users.Include(u => u.Enrollments).SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"User with ID '{id}' was not found.");

            return user.Enrollments.Any(e => e.CourseId == courseId);
        }

        public async Task<Enrollment> EnrollUserAsync(Enrollment enrollment, Guid id)
        {
            if (await context.Users.SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"User with ID '{id}' was not found.");

            await context.Enrollments.AddAsync(enrollment);
            await context.SaveChangesAsync();

            return enrollment;
        }

        public async Task<List<Progress>> GetUserProgressAsync(Guid id)
        {
            if (await context.Users.Include(u => u.Progress).SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"User with ID '{id}' was not found.");

            return user!.Progress.ToList();
        }

        public async Task<Progress> AddProgressAsync(Progress progress, Guid id)
        {
            if (await context.Users.SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"User with ID '{id}' was not found.");

            await context.Progress.AddAsync(progress);
            await context.SaveChangesAsync();

            return progress;
        }

        public async Task<bool> hasProgressAsync(Guid lessonId, Guid id)
        {
            if (await context.Users.Include(u => u.Progress).SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"User with ID '{id}' was not found.");

            return user.Progress.Any(p => p.LessonId == lessonId);

        }

        public async Task<bool> isExistsAsync(Guid userId)
        {
            return await context.Users.AnyAsync(u => u.Id == userId);
        }

        public async Task<bool> HasUserWithEmailAsync(string email)
        {
            if (email is null)
                throw new ArgumentNullException(nameof(String));

            return await context.Users.AnyAsync(u => u.Email == email);
        }

    }
}
