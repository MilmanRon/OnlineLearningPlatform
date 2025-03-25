using API.Domain.Entities;

namespace API.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> AddUserAsync(User user);

        Task<User> GetUserByIdAsync(Guid id);

        Task<User?> GetUserByEmail(string email);

        Task DeleteUserAsync(Guid id);

        Task<bool> HasUserWithEmailAsync(string email);

        Task<bool> ExistsAsync(Guid id);

    }                        
}
