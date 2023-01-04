using AutoMapper;
using Core.DTO.Account;
using Core.DTO.Mail;
using Core.Entity.UserEntitys;
using Core.Helpers;
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
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;
        private readonly IWebHostEnvironment _env;

        public AccountController(UserManager<User> userManager, IJwtService jwtService, IMapper mapper, IMailService mailService, IWebHostEnvironment env)
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _mapper = mapper;
            _mailService = mailService;
            _env = env;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> Register([FromForm] RegisterDTO register)
        {
            var user = _mapper.Map<User>(register);
            try
            {
                var findEmail = await _userManager.FindByEmailAsync(register.Email);
                if (findEmail != null)
                    return BadRequest(new { error = "Email already exists!" });

                var findLogin = await _userManager.FindByNameAsync(register.UserName);
                if (findLogin != null)
                    return BadRequest(new { error = "Login already exists!" });

                if (register.Password != register.ConfirmPassword)
                    return BadRequest(new { error = "Password does not match the confirm password!" });

                user.DateCreate = DateOnly.FromDateTime(DateTime.Now.Date);
                user.IsVerified = false;
                user.IsPrivateUser = false;

                string fileDestDir = Path.Combine("Resources", "UserImage", user.Id);
                string createImage = await StaticFiles.CreateImageAsync(_env, fileDestDir, register.UserImage);
                user.UserImage = createImage;

                var result = await _userManager.CreateAsync(user, register.Password);
                if (!result.Succeeded)
                    return BadRequest(new { error = ExceptionBuild.BuilderException(result) });

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

        [HttpPost("EmailConfirm")]
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

        [HttpPost("Login")]
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

        [HttpPost("RecoverPassword")]
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

        [HttpPost("PasswordConfirm")]
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
    }
}