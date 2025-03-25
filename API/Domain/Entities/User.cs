﻿namespace API.Domain.Entities;

public class User
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required string Email { get; set; }

    public required byte[] PasswordHash { get; set; }

    public required byte[] PasswordSalt { get; set; }

    public List<Enrollment> Enrollments { get; set; } = null!;

    public List<Progress> Progress { get; set; } = null!;
}
