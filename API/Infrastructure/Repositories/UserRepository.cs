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
                throw new EntityNotFoundException(nameof(User), id);

            return user;
        }

        public async Task<User> UpdateUserAsync(User updatedUser)
        {
            if(updatedUser is null)
                throw new ArgumentNullException(nameof(updatedUser));

            var currentUser = await context.Users.FindAsync(updatedUser.Id);

            if (currentUser is null)
                throw new EntityNotFoundException(nameof(User), updatedUser.Id);

            currentUser.Name = updatedUser.Name;
            currentUser.Email = updatedUser.Email;

            await context.SaveChangesAsync();

            return currentUser;
        }

        public async Task DeleteUserAsync(Guid id)
        {
            var user = await context.Users.FindAsync(id);

            if (user == null)
                throw new EntityNotFoundException(nameof(User), id);

            context.Users.Remove(user);
            await context.SaveChangesAsync();
        }


        public async Task<User?> GetUserByEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
                throw new ArgumentException($"Argument: '{nameof(email)}' can't be null or empty");

            var user = await context.Users.SingleOrDefaultAsync(u => u.Email == email);

            return user;
        }

        public async Task<List<Enrollment>> GetUserEnrollments(Guid id)
        {
            if (await context.Users.Include(u => u.Enrollments).SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"{nameof(User)} with id {id} was not found.");

            return user!.Enrollments.ToList();
        }

        public async Task<bool> isAlreadyEnrolled(Guid courseId, Guid id)
        {
            if (await context.Users.Include(u => u.Enrollments).SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"{nameof(User)} with id {id} was not found.");

            return user.Enrollments.Any(e => e.CourseId == courseId);
        }

        public async Task<Enrollment> EnrollUser(Enrollment enrollment, Guid id)
        {
            if (await context.Users.SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"{nameof(User)} with id {id} was not found.");

            await context.Enrollments.AddAsync(enrollment);
            await context.SaveChangesAsync();

            return enrollment;
        }

        public async Task<List<Progress>> GetUserProgress(Guid id)
        {
            if (await context.Users.Include(u => u.Progress).SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"{nameof(User)} with id {id} was not found.");

            return user!.Progress.ToList();
        }

        public async Task<Progress> AddProgress(Progress progress, Guid id)
        {
            if (await context.Users.SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"{nameof(User)} with id {id} was not found.");

            await context.Progress.AddAsync(progress);
            await context.SaveChangesAsync();

            return progress;
        }

        public async Task<bool> hasProgress(Guid lessonId, Guid id)
        {
            if (await context.Users.Include(u => u.Progress).SingleOrDefaultAsync(u => u.Id == id) is not User user)
                throw new KeyNotFoundException($"{nameof(User)} with id {id} was not found.");

            return user.Progress.Any(p => p.LessonId == lessonId);

        }

        public async Task<bool> isExistsAsync(Guid userId)
        {
            return await context.Users.AnyAsync(u => u.Id == userId);
        }

        public async Task<bool> HasUserWithEmailAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
                throw new ArgumentException("Email can't be null or empty.");

            return await context.Users.AnyAsync(u => u.Email == email);
        }

    }
}
