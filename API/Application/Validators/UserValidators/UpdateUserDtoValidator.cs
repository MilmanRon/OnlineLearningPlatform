using API.Application.DTOs.User;
using FluentValidation;

namespace API.Application.Validators.UserValidators
{
    public class UpdateUserDtoValidator : AbstractValidator<UpdateUserDto>
    {
        public UpdateUserDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .Length(2, 30).WithMessage("Name must be between 2 and 30 characters.")
                .Matches(@"^[a-zA-Z\s\-'\.]+$").WithMessage("Name can only contain letters, spaces, hyphens, apostrophes, and periods.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("A valid email address is required.")
                .MaximumLength(256).WithMessage("Email must not exceed 256 characters.");
        }
    }
}
