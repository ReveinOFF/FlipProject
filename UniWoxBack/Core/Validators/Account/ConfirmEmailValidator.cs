using Core.DTO.Account;
using FluentValidation;

namespace Core.Validators.Account
{
    public class ConfirmEmailValidator : AbstractValidator<ConfirmEmailDTO>
    {
        public ConfirmEmailValidator()
        {
            RuleFor(x => x.Email)
                .EmailAddress().WithMessage("")
                .NotEmpty().WithMessage("");
            RuleFor(x => x.Token)
                .NotEmpty().WithMessage("");
        }
    }
}
