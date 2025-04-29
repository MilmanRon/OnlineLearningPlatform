using API.Domain.Entities;

namespace API.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> AddUserAsync(User user);

        Task<User> GetUserByIdAsync(Guid id);

        Task<User> UpdateUserAsync(User updatedUser);

        Task DeleteUserAsync(Guid id);

        Task<User?> GetUserByEmailAsync(string email);

        Task<List<Enrollment>> GetUserEnrollmentsAsync(Guid id);

        Task<Enrollment> EnrollUserAsync(Enrollment enrollment, Guid id);

        Task<List<Progress>> GetUserProgressAsync(Guid id);

        Task<Progress> AddProgressAsync(Progress progress, Guid id);


        Task<bool> HasUserWithEmailAsync(string email);

        Task<bool> isAlreadyEnrolledAsync(Guid courseId, Guid id);

        Task<bool> isExistsAsync(Guid id);

        Task<bool> hasProgressAsync(Guid lessonId, Guid id);
    }                        
}
