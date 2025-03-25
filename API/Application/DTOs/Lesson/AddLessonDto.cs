namespace API.Application.DTOs.Lesson
{
    public class AddLessonDto
    {
        public required string Title { get; set; }

        public required string VideoUrl { get; set; }

        public required Guid CourseId { get; set; }
    }
}
