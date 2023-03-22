using AutoMapper;
using Core.DTO.Account;
using Core.DTO.Mail;
using Core.DTO.User;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Core.Interface;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
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

        public SettingsController(DataBase context, UserManager<User> userManager, IMapper mapper, IWebHostEnvironment env, IMailService mailService)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
            _env = env;
            _mailService = mailService;
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
            byte[] tokenGeneratedBytes = Encoding.UTF8.GetBytes(token);
            var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);

            string Body = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailHTML", "ChangeEmail.html"));
            //Body = Body.Replace("#url#", $"http://localhost:3000/email-change?token={codeEncoded}&email={user.Email}");
            Body = Body.Replace("#url#", $"https://solido.tk/email-change?token={codeEncoded}&email={user.Email}");

            MailDataDTO mailData = new MailDataDTO()
            {
                Body = Body,
                To = user.Email,
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
                return BadRequest("User not found!");

            await _userManager.ChangeEmailAsync(user, emailDTO.NewEmail, emailDTO.Token);

            string Body = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailHTML", "ChangeEmailTHX.html"));

            MailDataDTO mailData = new MailDataDTO()
            {
                Body = Body,
                To = user.Email,
                Subject = "Confirmation email"
            };

            var resultSend = await _mailService.SendEmailAsync(mailData);

            if (!resultSend)
                return BadRequest("Error in sending the message!");

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

        [HttpPut("get-all-authorize")]
        public async Task<IActionResult> GetAllAuthorize()
        {
            return Ok();
        }
    }
}
