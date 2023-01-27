using Core.DTO.Account;
using Core.Interface;
using FluentValidation;
using System.Text.RegularExpressions;

namespace Core.Validators.Account
{
    public class RegisterValidator : AbstractValidator<RegisterDTO>
    {
        private IValidatorRepository _validatorRepository;
        public RegisterValidator(IValidatorRepository validatorRepository)
        {
            _validatorRepository = validatorRepository;

            RuleFor(x => x.Email)
               .NotEmpty().WithMessage("Email is required.")
               .Must(_validatorRepository.UniqueEmail).WithMessage("This email is already taken!")
               .EmailAddress().WithMessage("Email is not entered correctly!");
            RuleFor(x => x.UserName)
                    .NotEmpty().WithMessage("Login cannot be empty")
                    .MinimumLength(5).WithMessage("Login must be at least 5 characters long")
                    .MaximumLength(15).WithMessage("Login must contain no more than 15 characters")
                    .Must(_validatorRepository.UniqueUserName).WithMessage("This login is already taken!")
                    .Matches(new Regex("^[a-zA-Z0-9-._!]{5,15}$")).WithMessage("Login not valid");
            RuleFor(x => x.Name)
                    .NotEmpty().WithMessage("Name is required.")
                    .Must(_validatorRepository.UniqueName).WithMessage("This name is already taken!")
                    .MinimumLength(5).WithMessage("The name must contain at least 5 characters")
                    .MaximumLength(15).WithMessage("The name must be no more than 10 characters!");
            RuleFor(x => x.Phone)
                    .NotEmpty().WithMessage("Phone Number is required.")
                    .Must(_validatorRepository.UniquePhone).WithMessage("This phone is already taken!")
                    .MinimumLength(9).WithMessage("PhoneNumber must not be less than 9 characters.")
                    .MaximumLength(15).WithMessage("PhoneNumber must not exceed 50 characters.")
                    .Matches(new Regex(@"^([\+]?[380]{3}?|[0])[0-9]{9}$")).WithMessage("PhoneNumber not valid");
            RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("The password field is required!")
                    .MinimumLength(8).WithMessage("Password must be at least 8 characters long!")
                    .MaximumLength(15).WithMessage("Password must contain no more than 15 characters!");
        }
    }
}
