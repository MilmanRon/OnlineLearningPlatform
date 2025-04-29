namespace API.Application.DTOs.Enrollment
{
    public class AddEnrollmentDto
    {
        public Guid CourseId { get; set; }

        public Guid UserId { get; set; }
    }
}
