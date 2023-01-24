using Core.DTO.Account;
using FluentValidation;

namespace Core.Validators.Account
{
    public class LoginValidator : AbstractValidator<LoginDTO>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Name)
                    .NotEmpty().WithMessage("Login cannot be empty");
            RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("The password field is required!");
        }
    }
}
