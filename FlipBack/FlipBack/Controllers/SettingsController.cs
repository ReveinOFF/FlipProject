using AutoMapper;
using Core.DTO.Account;
using Core.DTO.Mail;
using Core.DTO.User;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Core.Interface;
using Core.Service;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace FlipBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SettingsController : ControllerBase
    {
        private readonly DataBase _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;
        private readonly IMailService _mailService;
        private readonly IJwtService _jwtService;

        public SettingsController(DataBase context, UserManager<User> userManager, IMapper mapper, IWebHostEnvironment env, IMailService mailService, IJwtService jwtService)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
            _env = env;
            _mailService = mailService;
            _jwtService = jwtService;
        }

        [HttpPost("add-image-user/{userId}")]
        public async Task<IActionResult> AddImageUser(string userId, IFormFile file)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return BadRequest("User not found!");

            if (user.UserImagePath != null)
            {
                bool deleteFile = StaticFiles.DeleteFileAsync(user.UserImagePath);
                if (!deleteFile)
                    return BadRequest("Image not found!");
            }

            string fileDestDir = Path.Combine("Resources", "UserImages", user.Id);

            var newImage = await StaticFiles.CreateImageAsync(_env, fileDestDir, file, 209, 209);

            if (newImage.FilePath == null)
                return BadRequest("The link to the file was not created!");

            if (newImage.FileName == null)
                return BadRequest("The name to the file was not created!");

            user.UserImage = newImage.FileName;
            user.UserImagePath = newImage.FilePath;

            await _userManager.UpdateAsync(user);

            return Ok();
        }

        [HttpDelete("delete-image-user/{userId}")]
        public async Task<IActionResult> DeleteImageUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return BadRequest("User not found!");

            bool deleteFile = StaticFiles.DeleteFileAsync(user.UserImagePath);
            if (!deleteFile)
                return BadRequest("Image not found!");

            user.UserImage = null;
            user.UserImagePath = null;

            await _userManager.UpdateAsync(user);

            return Ok();
        }

        [HttpPut("edit-user")]
        public async Task<IActionResult> EditUser([FromBody] ChangeUserDTO changeUser)
        {
            var user = await _userManager.FindByIdAsync(changeUser.Id);

            if (user == null)
                return BadRequest("User not found!");

            user.Name = changeUser.Name;
            user.PhoneNumber = changeUser.NumberPhone;
            user.Description = changeUser.Description;
            user.DateOfBirth = changeUser.DateOfBirth;
            user.UserName = changeUser.UserName;

            await _userManager.UpdateAsync(user);
            await _userManager.UpdateNormalizedUserNameAsync(user);

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
            byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(token);
            var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);

            string Body = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailHTML", "ChangeEmail.html"));
            Body = Body.Replace("#url#", $"https://solido.tk/email-change?token={codeEncoded}&curr-email={emailDTO.OldEmail}&new-email={emailDTO.NewEmail}");

            MailDataDTO mailData = new MailDataDTO()
            {
                Body = Body,
                To = emailDTO.OldEmail,
                Subject = "Change Email"
            };

            await _mailService.SendEmailAsync(mailData);

            return Ok();
        }

        [HttpPost("confirm-change-email")]
        public async Task<IActionResult> ConfirmChangeEmail([FromBody] ConfChangeEmailDTO emailDTO)
        {
            var user = await _userManager.FindByEmailAsync(emailDTO.OldEmail);
            if (user == null)
                return BadRequest("User not found!");

            var codeDecodedBytes = WebEncoders.Base64UrlDecode(emailDTO.Token);
            var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);
            await _userManager.ChangeEmailAsync(user, emailDTO.NewEmail, codeDecoded);

            string Body = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailHTML", "ChangeEmailTHX.html"));

            MailDataDTO mailData = new MailDataDTO()
            {
                Body = Body,
                To = user.Email,
                Subject = "Confirmation email"
            };

            await _mailService.SendEmailAsync(mailData);

            return Ok();
        }

        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePassword)
        {
            var user = await _userManager.FindByIdAsync(changePassword.Id);

            if (user == null)
                return BadRequest("User not found!");

            await _userManager.ChangePasswordAsync(user, changePassword.OldPassword, changePassword.NewPassword);

            return Ok();
        }

        [HttpPost("recover-password")]
        public async Task<IActionResult> RecoverPassword([FromBody] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                return BadRequest("User not found!");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(token);
            var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);

            string Body = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailHTML", "RecoverPassword.html"));
            Body = Body.Replace("#url#", $"https://solido.tk/recover-password?token={codeEncoded}");

            MailDataDTO mailData = new MailDataDTO()
            {
                Body = Body,
                To = user.Email,
                Subject = "Recover Password"
            };

            await _mailService.SendEmailAsync(mailData);

            return Ok();
        }

        [HttpPost("confirm-recover")]
        public async Task<IActionResult> ConfirmRecover([FromBody] ConfirmPasswordDTO confirmPass)
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

        [HttpGet("get-all-authorize")]
        public async Task<IActionResult> GetAllAuthorize()
        {
            string userId = User.FindFirst("UserId")?.Value;

            var user = await _userManager.Users.Include(i => i.Authentications).FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
                return BadRequest("User not found!");

            var map = _mapper.Map<List<GetAuthorizeDTO>>(user.Authentications.ToList());

            return Ok(map);
        }
    }
}
