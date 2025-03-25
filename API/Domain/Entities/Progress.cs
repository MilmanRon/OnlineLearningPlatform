using System.Text.Json.Serialization;

namespace API.Domain.Entities
{
    public class Progress
    {
        public Guid Id { get; set; }

        public DateTime? WatchedAt { get; set; }

        public required Guid LessonId { get; set; }

        [JsonIgnore]
        public Lesson Lesson { get; set; } = null!;

        public required Guid UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; } = null!;

    }
}
