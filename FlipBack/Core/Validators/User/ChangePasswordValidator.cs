﻿using Core.DTO.User;
using FluentValidation;

namespace Core.Validators.User
{
    public class ChangePasswordValidator : AbstractValidator<ChangePasswordDTO>
    {
        public ChangePasswordValidator()
        {
            RuleFor(x => x.OldPassword)
                    .NotEmpty().WithMessage("The password field is required!");
            RuleFor(x => x.NewPassword)
                    .NotEmpty().WithMessage("The new password field is required!")
                    .MinimumLength(8).WithMessage("Password must be at least 8 characters long!")
                    .MaximumLength(15).WithMessage("Password must contain no more than 15 characters!")
                    .NotEqual(x => x.OldPassword).WithMessage("The new password cannot be similar to the old one!");
        }
    }
}
