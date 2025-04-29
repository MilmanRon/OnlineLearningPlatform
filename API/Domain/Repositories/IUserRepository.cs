using API.Domain.Entities;

namespace API.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> AddUserAsync(User user);

        Task<User> GetUserByIdAsync(Guid id);

        Task<User> UpdateUserAsync(User updatedUser);

        Task DeleteUserAsync(Guid id);

        Task<User?> GetUserByEmail(string email);

        Task<List<Enrollment>> GetUserEnrollments(Guid id);

        Task<Enrollment> EnrollUser(Enrollment enrollment, Guid id);

        Task<List<Progress>> GetUserProgress(Guid id);

        Task<Progress> AddProgress(Progress progress, Guid id);


        Task<bool> HasUserWithEmailAsync(string email);

        Task<bool> isAlreadyEnrolled(Guid courseId, Guid id);

        Task<bool> isExistsAsync(Guid id);

        Task<bool> hasProgress(Guid lessonId, Guid id);
    }                        
}
