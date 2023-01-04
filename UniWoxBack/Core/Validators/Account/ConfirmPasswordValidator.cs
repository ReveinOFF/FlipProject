﻿using Core.DTO.Account;
using FluentValidation;

namespace Core.Validators.Account
{
    public class ConfirmPasswordValidator : AbstractValidator<ConfirmPasswordDTO>
    {
        public ConfirmPasswordValidator()
        {
            RuleFor(x => x.Email)
                .EmailAddress().WithMessage("")
                .NotEmpty().WithMessage("");
            RuleFor(x => x.NewPassword)
                .NotEmpty().WithMessage("The password field is required!")
                .MinimumLength(8).WithMessage("Password must be at least 8 characters long!");
            RuleFor(x => x.Token)
                .NotEmpty().WithMessage("");
        }
    }
}