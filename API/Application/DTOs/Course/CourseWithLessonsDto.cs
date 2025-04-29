using API.Application.DTOs.Lesson;

namespace API.Application.DTOs.Course
{
    public class CourseWithLessonsDto
    {
        public Guid Id { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<LessonResponseDto> Lessons { get; set; } = [];
    }
}
