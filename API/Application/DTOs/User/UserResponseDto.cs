using API.Domain.Entities;

public class UserResponseDto
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required string Email { get; set; }

    public required Role Role { get; set; }

    public required string Token { get; set; }

    //public List<Enrollment> Enrollments { get; set; } = null!;

    //public List<Progress> Progress { get; set; } = null!;

}
