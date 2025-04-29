using API.Application.DTOs.Lesson;
using FluentValidation;

namespace API.Application.Validators.LessonValidators
{
    public class UpdateLessonDtoValidator : AbstractValidator<UpdateLessonDto>
    {
        public UpdateLessonDtoValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required.")
                .Length(1, 30).WithMessage("Title must be between 1 and 30 characters.");

            RuleFor(x => x.VideoUrl)
                .NotEmpty().WithMessage("'VideoUrl' is required.")
                .Matches("^(https?:\\/\\/)?(www\\.)?(youtube\\.com\\/embed\\/|youtu\\.be\\/)[a-zA-Z0-9_-]{11}(?:\\?.*)?$");
        }

    }
}
