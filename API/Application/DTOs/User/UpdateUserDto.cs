namespace API.Application.DTOs.User
{
    public class UpdateUserDto
    {
        public Guid Id { get; set; }

        public required string Name { get; set; } 

        public required string Email { get; set; } 
    }
}
