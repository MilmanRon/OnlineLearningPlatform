namespace API.Application.DTOs.Enrollment
{
    public class EnrollmentResponseDto
    {
        public Guid Id { get; set; }

        public Guid CourseId { get; set; }

        public DateTime EnrolledAt { get; set; }

        //public Guid UserId { get; set; }
    }
}
