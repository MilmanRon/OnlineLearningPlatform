namespace API.Application.DTOs.Progress
{
    public class ProgressResponseDto
    {
        public Guid Id { get; set; }

        public DateTime WatchedAt { get; set; }

        public required Guid LessonId { get; set; }

        //public required Guid UserId { get; set; }
    }
}
