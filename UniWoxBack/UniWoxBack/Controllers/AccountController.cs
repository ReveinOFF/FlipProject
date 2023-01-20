using AutoMapper;
using Core.DTO.Account;
using Core.DTO.Mail;
using Core.DTO.User;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Core.Interface;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly DataBase _context;

        public AccountController(UserManager<User> userManager, IJwtService jwtService, IMapper mapper, IMailService mailService, IWebHostEnvironment env, DataBase context)
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _mapper = mapper;
            _mailService = mailService;
            _env = env;
            _context = context;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Register([FromForm] RegisterDTO register)
        {
            var user = _mapper.Map<User>(register);
            try
            {
                var findEmail = await _userManager.FindByEmailAsync(register.Email);
                if (findEmail != null)
                {
                    if (findEmail.EmailConfirmed)
                        return BadRequest("Email already exists!");
                    else
                        await _userManager.DeleteAsync(findEmail);
                }

                var findLogin = await _userManager.FindByNameAsync(register.UserName);
                if (findLogin != null)
                    return BadRequest("Login already exists!");

                user.DateCreate = DateOnly.FromDateTime(DateTime.Now.Date);
                user.IsVerified = false;
                user.IsPrivateUser = false;

                string fileDestDir = Path.Combine("Resources", "UserImage", user.Id);
                var createImage = await StaticFiles.CreateImageAsync(_env, fileDestDir, register.UserImage);
                user.UserImage = createImage.FileName;
                user.UserImagePath = createImage.FileName;

                var result = await _userManager.CreateAsync(user, register.Password);
                if (!result.Succeeded)
                    return BadRequest(ExceptionBuild.BuilderException(result));

                var role = await _userManager.AddToRoleAsync(user, "User");
                if (!role.Succeeded)
                    return BadRequest(ExceptionBuild.BuilderException(role));

                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = $"http://uniwox.com/emailconfirm?token={token}";

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

        [HttpPost("email-confirm")]
        public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailDTO confirmEmail)
        {
            var user = await _userManager.FindByEmailAsync(confirmEmail.Email);
            if (user == null)
                return BadRequest("Email not found!");

            var result = await _userManager.ConfirmEmailAsync(user, confirmEmail.Token);

            if (!result.Succeeded)
                return BadRequest("There is a problem with password confirmation!");

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
            try
            {
                //var findUser = await _userManager.FindByNameAsync(login.UserName);
                var findUser = await _userManager.Users.Include(u => u.RefreshTokens).SingleAsync(u => u.UserName == login.UserName);
                if (findUser == null)
                    return BadRequest("Error when searching for an account!");
                if (!await _userManager.CheckPasswordAsync(findUser, login.Password))
                    return BadRequest("Error in password verification!");
                if (!await _userManager.IsEmailConfirmedAsync(findUser))
                    return BadRequest("Email is not confirmed!");

                var user = _mapper.Map<GetUserDTO>(findUser);

                var token = _jwtService.CreateToken(findUser);
                var refreshToken = _jwtService.GenerateRefreshToken();

                refreshToken.UserId = user.Id;
                await _context.RefreshTokens.AddAsync(refreshToken);
                await _context.SaveChangesAsync();

                //findUser.RefreshTokens.Add(refreshToken);
                //await _userManager.UpdateAsync(findUser);

                return Ok(new TokenDTO
                {
                    Token = token,
                    RefreshToken = refreshToken.Token
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("recover-password")]
        public async Task<IActionResult> RecoverPassword(string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);

                if (user == null)
                    return BadRequest("Email not found!");

                var token = _userManager.GeneratePasswordResetTokenAsync(user);
                var confirmationLink = $"http://uniwox.com/recoverpassword?token={token}";

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

        [HttpPost("password-confirm")]
        public async Task<IActionResult> ConfirmPassword([FromBody] ConfirmPasswordDTO confirmPass)
        {
            var user = await _userManager.FindByEmailAsync(confirmPass.Email);
            if (user == null)
                return BadRequest("Email not found!");

            var result = await _userManager.ResetPasswordAsync(user, confirmPass.Token, confirmPass.NewPassword);

            if (!result.Succeeded)
                return BadRequest("There is a problem resetting the password!");

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

        [HttpPost("change-email")]
        public async Task<IActionResult> ChangeEmail([FromBody] ChangeEmailDTO emailDTO)
        {
            var user = await _userManager.FindByEmailAsync(emailDTO.OldEmail);
            if (user == null)
                return BadRequest("Email not found!");

            var findUser = await _userManager.FindByEmailAsync(emailDTO.NewEmail);
            if (findUser != null)
                return BadRequest("Email already exists!");

            var token = await _userManager.GenerateChangeEmailTokenAsync(user, emailDTO.NewEmail);
            var confirmationLink = $"http://uniwox.com/changemail?token={token}";

            MailDataDTO mailData = new MailDataDTO()
            {
                Body = $"Hello {emailDTO.OldEmail}. If you have change your email, follow this link {confirmationLink}",
                To = emailDTO.OldEmail,
                Subject = "Change Email"
            };

            var resultSend = await _mailService.SendEmailAsync(mailData);

            if (!resultSend)
                return BadRequest("Error in sending the message!");

            return Ok();
        }

        [HttpPost("confirm-change-email")]
        public async Task<IActionResult> ConfirmChangeEmail([FromBody] ConfChangeEmailDTO emailDTO)
        {
            var user = await _userManager.FindByEmailAsync(emailDTO.OldEmail);
            if (user == null)
                return BadRequest("Email not found!");

            var changeEmail = await _userManager.ChangeEmailAsync(user, emailDTO.NewEmail, emailDTO.Token);

            if (!changeEmail.Succeeded)
                return BadRequest("Error in changing the email!");

            return Ok();
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshTokens(string refreshToken)
        {
            var tokens = await _jwtService.RefreshTokens(refreshToken);

            if (tokens == null)
                return Unauthorized("Invalid Refresh Token!");

            await RevokeToken(refreshToken);

            return Ok(tokens);
        }

        [HttpPost("renew-token")]
        public async Task<IActionResult> RenewTokens(string refreshToken)
        {
            var tokens = await _jwtService.RenewTokens(refreshToken);

            if (tokens == null)
                return ValidationProblem("Invalid Renew Token!");

            await RevokeToken(refreshToken);

            return Ok(tokens);
        }

        [Authorize]
        [HttpPost("revoke-token")]
        public async Task<IActionResult> RevokeToken(string refreshToken)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));

            if (user == null)
                return BadRequest("Token is required!");

            var refToken = user.RefreshTokens.Single(x => x.Token == refreshToken);

            if (DateTime.UtcNow > refToken.Expires)
                return BadRequest("The Refresh Token has expired!");

            _context.RefreshTokens.Remove(refToken);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}