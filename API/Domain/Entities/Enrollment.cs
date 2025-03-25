using System.Text.Json.Serialization;

namespace API.Domain.Entities
{
    public class Enrollment
    {
        public Guid Id { get; set; }

        public required Guid CourseId { get; set; }

        public DateTime EnrolledAt { get; set; }

        public required Guid UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; } = null!;

        [JsonIgnore]
        public Course Course { get; set; } = null!;
    }
}
