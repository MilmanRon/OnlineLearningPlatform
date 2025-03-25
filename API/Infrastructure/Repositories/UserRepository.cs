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

        public async Task DeleteUserAsync(Guid id)
        {
            var user = await context.Users.FindAsync(id);

            if (user == null)
                throw new EntityNotFoundException(nameof(User), id);

            context.Users.Remove(user);
            await context.SaveChangesAsync();
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

        public async Task<User?> GetUserByEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
                throw new ArgumentException($"Argument: '{nameof(email)}' can't be null or empty");

            var user = await context.Users.SingleOrDefaultAsync(u => u.Email == email);

            return user;
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await context.Users.AnyAsync(u => u.Id == id);
        }

        public async Task<bool> HasUserWithEmailAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
                throw new ArgumentException("Email can't be null or empty.");

            return await context.Users.AnyAsync(u => u.Email == email);
        }


    }
}
