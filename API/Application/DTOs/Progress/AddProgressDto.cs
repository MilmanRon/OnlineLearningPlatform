namespace API.Application.DTOs.Progress
{
    public class AddProgressDto
    {
        public Guid LessonId { get; set; }

        public Guid UserId { get; set; }
    }
}
