namespace API.Application.DTOs.Course
{
    public class UpdateCourseDto
    {
        public Guid Id { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }
    }
}
