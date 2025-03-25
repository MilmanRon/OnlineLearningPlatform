using API.Domain.Entities;

namespace API.Domain.Repositories
{
    public interface IEnrollmentRepository
    {
        Task<Enrollment> AddEnrollmentAsync(Enrollment enrollment);

        Task DeleteEnrollmentAsync(Guid id);
    }
}
