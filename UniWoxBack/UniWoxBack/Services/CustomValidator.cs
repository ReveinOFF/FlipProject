using Core.Entity.UserEntitys;
using Microsoft.AspNetCore.Identity;

namespace UniWoxBack.Services
{
    public class CustomValidator : PasswordValidator<User>
    {
        public override async Task<IdentityResult> ValidateAsync(UserManager<User> manager,
            User user, string password)
        {
            IdentityResult result = await base.ValidateAsync(manager, user, password);
            List<IdentityError> errors = result.Succeeded ? new List<IdentityError>() : result.Errors.ToList();
            if (string.Equals(user.UserName, password, StringComparison.OrdinalIgnoreCase))
            {
                errors.Add(new IdentityError
                {
                    Code = "UsernameAsPassword",
                    Description = "You cannot use your username as your password!"
                });
            }
            if (password.Length > 15)
            {
                errors.Add(new IdentityError
                {
                    Code = "PasswordMaxLength",
                    Description = "Password should not be more than 25 values!"
                });
            }
            return errors.Count == 0 ? IdentityResult.Success : IdentityResult.Failed(errors.ToArray());
        }
    }
}
