namespace API.Domain.Entities
{
    public class Course
    {
        public Guid Id { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<Lesson> Lessons { get; set; } = null!;
    }
}
