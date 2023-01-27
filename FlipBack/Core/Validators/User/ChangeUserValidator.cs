using Core.DTO.User;
using Core.Interface;
using FluentValidation;

namespace Core.Validators.User
{
    public class ChangeUserValidator : AbstractValidator<ChangeUserDTO>
    {
        private IValidatorRepository _validatorRepository;
        public ChangeUserValidator(IValidatorRepository validatorRepository)
        {
            _validatorRepository = validatorRepository;

            RuleFor(x => x.Name)
                    .NotEmpty().WithMessage("Name is required.")
                    .Must(_validatorRepository.UniqueName).WithMessage("This name is already taken!")
                    .MinimumLength(5).WithMessage("The name must contain at least 5 characters")
                    .MaximumLength(15).WithMessage("The name must be no more than 10 characters!");
            RuleFor(x => x.Description)
                .MaximumLength(20).WithMessage("The description must contain no more than 50 characters");
        }
    }
}
