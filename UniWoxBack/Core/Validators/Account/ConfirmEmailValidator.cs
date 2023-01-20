using Core.DTO.Account;
using FluentValidation;

namespace Core.Validators.Account
{
    public class ConfirmEmailValidator : AbstractValidator<ConfirmEmailDTO>
    {
        public ConfirmEmailValidator()
        {
            RuleFor(x => x.Email)
                .EmailAddress().WithMessage("The mail is not entered correctly!")
                .NotEmpty().WithMessage("The mail shouldn't be empty!");
            RuleFor(x => x.Token)
                .NotEmpty().WithMessage("The token must not be empty!");
        }
    }
}
