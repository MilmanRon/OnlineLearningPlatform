using API.Domain.Entities;
using System.Text.Json.Serialization;

public class LessonResponseDto
{
    public Guid Id { get; set; }

    public required string Title { get; set; }

    public required string VideoUrl { get; set; }

    public Guid CourseId { get; set; }

}
