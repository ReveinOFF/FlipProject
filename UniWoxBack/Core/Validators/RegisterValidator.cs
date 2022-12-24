﻿using Core.DTO.Account;
using FluentValidation;
using System.Text.RegularExpressions;

namespace Core.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterDTO>
    {  
        public RegisterValidator() 
        {
            RuleFor(x => x.Email)
               .NotEmpty().WithMessage("Email is required.")
               .EmailAddress().WithMessage("Email is not entered correctly!");
            RuleFor(x => x.UserName)
                    .NotEmpty().WithMessage("Login cannot be empty")
                    .MinimumLength(5).WithMessage("Login must be at least 5 characters long")
                    .MaximumLength(15).WithMessage("Login must contain no more than 15 characters")
                    .Matches(new Regex("^[a-zA-Z0-9-._!]{5,15}$")).WithMessage("Login not valid");
            RuleFor(x => x.Name)
                    .NotEmpty().WithMessage("Name is required.")
                    .MaximumLength(10).WithMessage("The name must be no more than 10 characters!");
            RuleFor(x => x.Surname)
                    .NotEmpty().WithMessage("Surname is required.")
                    .MaximumLength(15).WithMessage("The surname must be no more than 15 characters!");
            RuleFor(x => x.Phone)
                    .NotEmpty().WithMessage("Phone Number is required.")
                    .MinimumLength(9).WithMessage("PhoneNumber must not be less than 9 characters.")
                    .MaximumLength(15).WithMessage("PhoneNumber must not exceed 50 characters.")
                    .Matches(new Regex(@"^([\+]?[380]{3}?|[0])[0-9]{9}$")).WithMessage("PhoneNumber not valid");
            RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("The password field is required!")
                    .MinimumLength(8).WithMessage("Password must be at least 8 characters long!");
            RuleFor(x => x.ConfirmPassword)
                    .NotEmpty().WithMessage("The сonfirm password field is required!")
                    .Equal(x => x.Password).WithMessage("Password does not match!");
        }
    }
}
