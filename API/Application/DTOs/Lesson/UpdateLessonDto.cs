namespace API.Application.DTOs.Lesson
{
    public class UpdateLessonDto
    {
        public Guid Id { get; set; }

        public required string Title { get; set; }

        public required string VideoUrl { get; set; }
    }
}
