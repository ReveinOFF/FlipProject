using Core.DTO.Account;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Validators
{
    public class LoginValidator : AbstractValidator<LoginDTO>
    {
        public LoginValidator() 
        {
            RuleFor(x => x.UserName)
                    .NotEmpty().WithMessage("Login cannot be empty")
                    .MinimumLength(5).WithMessage("Login must be at least 5 characters long")
                    .MaximumLength(15).WithMessage("Login must contain no more than 15 characters");
            RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("The password field is required!")
                    .MinimumLength(8).WithMessage("Password must be at least 8 characters long!");
        }
    }
}
