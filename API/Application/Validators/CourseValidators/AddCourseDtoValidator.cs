using API.Application.DTOs.Course;
using FluentValidation;

namespace API.Application.Validators.CourseValidators
{
    public class AddCourseDtoValidator : AbstractValidator<AddCourseDto>
    {
        public AddCourseDtoValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required.")
                .Length(1, 30).WithMessage("Name must be between 1 and 30 characters.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required")
                .Length(3, 100).WithMessage("Description must be between 3 and 100 characters.");
        }
    }
}
