﻿using AutoMapper;
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
using FlipBack.Helpers;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace FlipBack.Controllers
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
        private readonly ICaptchaValidator _captchaValidator;

        public AccountController(UserManager<User> userManager, IJwtService jwtService, IMapper mapper, IMailService mailService, IWebHostEnvironment env, DataBase context, ICaptchaValidator captchaValidator)
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _mapper = mapper;
            _mailService = mailService;
            _env = env;
            _context = context;
            _captchaValidator = captchaValidator;
        }

        [HttpGet("check-email/{email}")]
        public async Task<IActionResult> CheckEmail(string email) 
        {
            var findUser = await _userManager.FindByEmailAsync(email);

            if (findUser != null && findUser.EmailConfirmed)
                return BadRequest("This email is already exists");

            return Ok();
        }

        [HttpGet("check-phone/{phone}")]
        public async Task<IActionResult> CheckPhone(string phone)
        {
            var findUser = await _userManager.Users.Where(x => phone == x.PhoneNumber).FirstOrDefaultAsync();

            if (findUser != null && findUser.EmailConfirmed)
                return BadRequest("This phone is already exists");

            return Ok();
        }

        [HttpGet("check-login/{login}")]
        public async Task<IActionResult> CheckLogin(string login)
        {
            var findUser = await _userManager.FindByNameAsync(login);

            if (findUser != null && findUser.EmailConfirmed)
                return BadRequest("This login is already exists");

            return Ok();
        }

        [HttpGet("check-name/{name}")]
        public async Task<IActionResult> CheckName(string name)
        {
            var findUser = await _userManager.Users.Where(x => x.Name == name).FirstOrDefaultAsync();

            if (findUser != null && findUser.EmailConfirmed)
                return BadRequest("This login is already exists");

            return Ok();
        }

        [HttpPost("add-authentication")]
        public async Task<IActionResult> AddAuthentication([FromBody] AddAuthDTO auth)
        {
            var user = await _userManager.Users.Include(i => i.Authentications).FirstOrDefaultAsync(x => x.Id == auth.UserId);

            if (user == null) 
                return NotFound("User not found!");

            if (user.Authentications.Any(a => a.IpAddress == auth.IpAddress))
                return Ok();

            await _context.Authentications.AddAsync(new UsersAuthentications
            {
                IpAddress = auth.IpAddress,
                Browser = auth.Browser,
                Device = auth.Device,
                City = auth.City,
                Country = auth.Country,
                LastOnline = DateTime.UtcNow,
                UserId = auth.UserId,
                Latitude = auth.Latitude,
                Longitude = auth.Longitude
            });
            await _context.SaveChangesAsync();

            return Ok();
        }
 
        [HttpPost("registration")]
        public async Task<IActionResult> Register([FromForm] RegisterDTO register)
        {
            if (!_captchaValidator.IsCaptchaPassedAsync(register.RecaptchaToken))
            {
                return BadRequest(new { error = "Recaptcha not valid" });
            }

            var user = _mapper.Map<User>(register);
            try
            {
                var findEmail = await _userManager.FindByEmailAsync(register.Email);
                if (findEmail != null)
                {
                    if (await _userManager.IsEmailConfirmedAsync(findEmail))
                        return BadRequest("Email already exists!");
                    else
                    {
                        StaticFiles.DeleteFileAsync(user.UserImagePath);
                        await _userManager.DeleteAsync(findEmail);
                    }
                }

                var findLogin = await _userManager.FindByNameAsync(register.UserName);
                if (findLogin != null)
                    return BadRequest("Login already exists!");

                user.DateCreate = DateOnly.FromDateTime(DateTime.Now.Date);
                user.IsVerified = false;
                user.IsPrivateUser = false;

                string fileDestDir = Path.Combine("Resources", "UserImages", user.Id);
                var createImage = await StaticFiles.CreateImageAsync(_env, fileDestDir, register.UserImage, 209, 209);
                user.UserImage = createImage.FileName;
                user.UserImagePath = createImage.FilePath;

                var result = await _userManager.CreateAsync(user, register.Password);
                if (!result.Succeeded)
                    return BadRequest(ExceptionBuild.BuilderException(result));

                var role = await _userManager.AddToRoleAsync(user, "User");
                if (!role.Succeeded)
                    return BadRequest(ExceptionBuild.BuilderException(role));

                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(token);
                var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);

                string Body = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailHTML", "ConfirmEmail.html"));
                Body = Body.Replace("#url#", $"https://solido.tk/email-confirm?token={codeEncoded}&email={user.Email}");

                MailDataDTO mailData = new MailDataDTO()
                {
                    Body = Body,
                    To = user.Email,
                    Subject = "Confirmation email"
                };

                await _mailService.SendEmailAsync(mailData);
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

            var codeDecodedBytes = WebEncoders.Base64UrlDecode(confirmEmail.Token);
            var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);
            var result = await _userManager.ConfirmEmailAsync(user, codeDecoded);

            if (!result.Succeeded)
                return BadRequest("There is a problem with password confirmation!");

            string Body = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailHTML", "ConfirmEmailTHX.html"));

            MailDataDTO mailData = new MailDataDTO()
            {
                Body = Body,
                To = user.Email,
                Subject = "Confirmation email"
            };

            var resultSend = await _mailService.SendEmailAsync(mailData);

            if (!resultSend)
                return BadRequest("Error in sending the message!");

            var token = _jwtService.CreateToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            refreshToken.UserId = user.Id;
            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return Ok(new TokenDTO
            {
                Token = token,
                RefreshToken = refreshToken.Token
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] LoginDTO login)
        {
            try
            {
                if (!_captchaValidator.IsCaptchaPassedAsync(login.RecaptchaToken))
                {
                    return BadRequest(new { error = "Recaptcha not valid" });
                }

                var findUser = await _userManager.Users.Include(u => u.RefreshTokens).Where(u => u.UserName == login.Name || u.Email == login.Name).FirstOrDefaultAsync();
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
        public async Task<IActionResult> RecoverPassword([FromBody] string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);

                if (user == null)
                    return BadRequest("Email not found!");

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(token);
                var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);

                string Body = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailHTML", "RecoverPassword.html"));
                Body = Body.Replace("#url#", $"https://solido.tk/change-password?token={codeEncoded}&email={email}");

                MailDataDTO mailData = new MailDataDTO()
                {
                    Body = Body,
                    To = user.Email,
                    Subject = "Recover Password"
                };

                await _mailService.SendEmailAsync(mailData);
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

            var codeDecodedBytes = WebEncoders.Base64UrlDecode(confirmPass.Token);
            var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);

            await _userManager.ResetPasswordAsync(user, codeDecoded, confirmPass.NewPassword);

            string Body = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailHTML", "RecoverPasswordTHX.html"));

            MailDataDTO mailData = new MailDataDTO()
            {
                Body = Body,
                To = user.Email,
                Subject = "Reset Password"
            };

            await _mailService.SendEmailAsync(mailData);

            return Ok();
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshTokens([FromBody] string refreshToken)
        {
            var tokens = await _jwtService.RefreshTokens(refreshToken);

            if (tokens == null)
                return BadRequest("Invalid Refresh Token!");

            await _context.RefreshTokens.AddAsync(tokens.TokensData);
            await _context.SaveChangesAsync();

            await RevokeToken(refreshToken);

            return Ok(tokens);
        }

        [Authorize]
        [HttpPost("revoke-token")]
        public async Task<IActionResult> RevokeToken([FromBody] string refreshToken)
        {
            var user = await _userManager.Users.Include(x => x.RefreshTokens).SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));

            if (user == null)
                return BadRequest("Token not found!");

            var refToken = user.RefreshTokens.Single(x => x.Token == refreshToken);

            if (DateTime.UtcNow > refToken.Expires)
                return BadRequest("The Refresh Token has expired!");

            _context.Entry(refToken).State = EntityState.Deleted;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}