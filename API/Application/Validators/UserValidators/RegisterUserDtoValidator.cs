using API.Application.DTOs.User;
using FluentValidation;

namespace API.Application.Validators.UserValidators;

public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
{
    public RegisterUserDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .Length(2, 30).WithMessage("Name must be between 2 and 30 characters.")
            .Matches(@"^[a-zA-Z\s\-'\.]+$").WithMessage("Name can only contain letters, spaces, hyphens, apostrophes, and periods.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("A valid email address is required.")
            .MaximumLength(256).WithMessage("Email must not exceed 256 characters.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
            .Must(HasUppercase).WithMessage("Password must contain at least one uppercase letter.")
            .Must(HasDigit).WithMessage("Password must contain at least one digit.")
            .Must(HasNonAlphanumeric).WithMessage("Password must contain at least one special character.");
    }

    private bool HasUppercase(string password)
    {
        return password != null && password.Any(char.IsUpper);
    }

    private bool HasDigit(string password)
    {
        return password != null && password.Any(char.IsDigit);
    }

    private bool HasNonAlphanumeric(string password)
    {
        return password != null && password.Any(c => !char.IsLetterOrDigit(c));
    }
}
