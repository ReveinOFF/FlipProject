using Core.DTO.User;
using FluentValidation;

namespace Core.Validators.User
{
    public class ChangeUserValidator : AbstractValidator<ChangeUserDTO>
    {
        public ChangeUserValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("");
            RuleFor(x => x.Name)
                    .NotEmpty().WithMessage("Name is required.")
                    .MaximumLength(10).WithMessage("The name must be no more than 10 characters!");
            RuleFor(x => x.Surname)
                    .NotEmpty().WithMessage("Surname is required.")
                    .MaximumLength(15).WithMessage("The surname must be no more than 15 characters!");
            RuleFor(x => x.Description)
                .MaximumLength(50).WithMessage("");
        }
    }
}
