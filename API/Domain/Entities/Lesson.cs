using System.Text.Json.Serialization;

namespace API.Domain.Entities
{
    public class Lesson
    {
        public Guid Id { get; set; }

        public required string Title { get; set; }

        public required string VideoUrl { get; set; }

        public Guid CourseId { get; set; }

        [JsonIgnore]
        public Course Course { get; set; } = null!;
    }
}
