using AutoMapper;
using Core.DTO.Account;
using Core.DTO.Mail;
using Core.Entity.UserEntitys;
using Core.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UniWoxBack.Helpers;

namespace UniWoxBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IJwtService jwtService, IMapper mapper, IMailService mailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _mapper = mapper;
            _mailService = mailService;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO register)
        {
            var user = _mapper.Map<User>(register);
            try
            {
                if (register.UserImage != null)
                {
                    string randomFilename = Path.GetRandomFileName() +
                        ".jpeg";
                }
                else
                    register.UserImage = "default.jpg";

                var findEmail = await _userManager.FindByEmailAsync(register.Email);
                if (findEmail != null)
                    return BadRequest(new { error = "Email already exists!" });

                var findLogin = await _userManager.FindByNameAsync(register.UserName);
                if (findLogin != null)
                    return BadRequest(new { error = "Login already exists!" });

                if (register.Password != register.ConfirmPassword)
                    return BadRequest(new { error = "Password does not match the confirm password!" });

                //var user = new User()
                //{
                //    UserName = register.UserName,
                //    Email = register.Email,
                //    Name = register.Name,
                //    Surname = register.Surname,
                //    UserImage = register.UserImage,
                //    PhoneNumber = register.Phone
                //};

                user.DateCreate = DateOnly.FromDateTime(DateTime.Now.Date);
                user.IsVerified = false;
                user.IsPrivateUser = false;

                var result = await _userManager.CreateAsync(user, register.Password);
                if (!result.Succeeded)
                    return BadRequest(new { error = ExceptionBuild.BuilderException(result) });

                //var findUser = await _userManager.FindByNameAsync(register.UserName);
                //if (findUser == null) 
                //{
                //    //exeption
                //}
                var role = await _userManager.AddToRoleAsync(user, "User");
                if (!role.Succeeded)
                    return BadRequest(new { error = ExceptionBuild.BuilderException(result) });

                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = $"http://uniwox.com/emailconfirm?email={register.Email}&token={token}";

                MailDataDTO mailData = new MailDataDTO()
                {
                    Body = $"Hello {user.Email}. Confirmation email link {confirmationLink}",
                    To = user.Email,
                    Subject = "Confirmation email"
                };

                var resultSend = await _mailService.SendEmailAsync(mailData);

                if (!resultSend)
                    return BadRequest("Error in sending the message!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpGet("emailconfirm")]
        public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailDTO confirmEmail)
        {
            var user = await _userManager.FindByEmailAsync(confirmEmail.Email);
            if (user == null)
                return BadRequest(new { error = "Email not found!" });

            var result = await _userManager.ConfirmEmailAsync(user, confirmEmail.Token);

            if (!result.Succeeded)
                return BadRequest(new { error = "There is a problem with password confirmation!" });

            MailDataDTO mailData = new MailDataDTO()
            {
                Body = $"Hello {user.Email}. Email confirmed!",
                To = user.Email,
                Subject = "Confirmation email"
            };

            var resultSend = await _mailService.SendEmailAsync(mailData);

            if (!resultSend)
                return BadRequest("Error in sending the message!");

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] LoginDTO login)
        {
            string token;
            try
            {
                var user = await _userManager.FindByNameAsync(login.UserName);
                if (user == null)
                    return BadRequest(new { error = "Error when searching for an account!" });
                if (!await _userManager.CheckPasswordAsync(user, login.Password))
                    return BadRequest(new { error = "Error in password verification!" });
                if (!await _userManager.IsEmailConfirmedAsync(user))
                    return BadRequest(new { error = "Email is not confirmed!" });

                token = _jwtService.CreateToken(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
            return Ok(new TokenDTO { Token = token});
        }

        [HttpPost("logout")]
        public async Task<IActionResult> LogOut()
        {
            try
            {
                await _signInManager.SignOutAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost("changeuser")]
        public async Task<IActionResult> ChangeUser([FromBody] ChangeUserDTO changeUser, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return BadRequest("User not found!");

            user.Name = changeUser.Name;
            user.Surname = changeUser.Surname;
            user.Description = changeUser.Description;
            user.DateOfBirth = changeUser.DateOfBirth;
            user.IsPrivateUser = changeUser.IsPrivateUser;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest("Error in changing user data!");

            return Ok();
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePassword, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return BadRequest("User not found!");

            var result = await _userManager.ChangePasswordAsync(user, changePassword.OldPassword, changePassword.NewPassword);

            if (!result.Succeeded)
                return BadRequest("Error in changing password!");

            return Ok();
        }

        [HttpPost("recoverpassword")]
        public async Task<IActionResult> RecoverPassword(string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);

                if (user == null)
                    return BadRequest("Email not found!");

                var token = _userManager.GeneratePasswordResetTokenAsync(user);
                var confirmationLink = $"http://uniwox.com/recoverpassword?email={email}&token={token}";

                MailDataDTO mailData = new MailDataDTO()
                {
                    Body = $"Hello {user.Email}. If you have forgotten your password, follow this link {confirmationLink}",
                    To = user.Email,
                    Subject = "Recover Password"
                };

                var resultSend = await _mailService.SendEmailAsync(mailData);

                if (!resultSend)
                    return BadRequest("Error in sending the message!");
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost("passwordconfirm")]
        public async Task<IActionResult> ConfirmPassword([FromBody] ConfirmPasswordDTO confirmPass)
        {
            var user = await _userManager.FindByEmailAsync(confirmPass.Email);
            if (user == null)
                return BadRequest(new { error = "Email not found!" });

            var result = await _userManager.ResetPasswordAsync(user, confirmPass.Token, confirmPass.NewPassword);

            if (!result.Succeeded)
                return BadRequest(new { error = "There is a problem resetting the password!" });

            MailDataDTO mailData = new MailDataDTO()
            {
                Body = $"Hello {user.Email}. Your password has been reset!",
                To = user.Email,
                Subject = "Reset Password"
            };

            var resultSend = await _mailService.SendEmailAsync(mailData);

            if (!resultSend)
                return BadRequest("Error in sending the message!");

            return Ok();
        }

        [HttpPost("deleteuser")]
        public async Task<IActionResult> DeleteUser()
        {
            var user = _userManager.Users.FirstOrDefault();
            if (user == null)
                return BadRequest("Error user!");

            var result = await _userManager.DeleteAsync(user);
            if (result == null)
                return BadRequest("Error result!");

            return Ok();
        }
    }
}