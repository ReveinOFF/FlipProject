using AutoMapper;
using Core.DTO.User;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UniWoxBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataBase _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;

        public UserController(DataBase context, UserManager<User> userManager, IMapper mapper, IWebHostEnvironment env)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
            _env = env;
        }

        [HttpGet("GetUser/{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userManager.Users
                .Where(x => x.Id == id)
                .Include(x => x.Followers)
                .Include(x => x.Followings)
                .Include(x => x.CreatedPosts)
                .ThenInclude(x => x.Files)
                .FirstOrDefaultAsync();

            if (user == null)
                return BadRequest("User not found!");

            return Ok(user);
        }

        [HttpPut("EditImageUser")]
        public async Task<IActionResult> EditImageUser(string userId, IFormFile file)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return BadRequest("User not found!");

            string fileDestDir = Path.Combine(_env.ContentRootPath, "Resources", "UserImage", user.Id);

            var newImage = await StaticFiles.EditImageAsync(user.UserImage, fileDestDir, file, _env);

            if (newImage == null)
                return BadRequest("The link to the file was not created!");

            user.UserImage = newImage;

            await _userManager.UpdateAsync(user);

            return Ok();
        }

        [HttpPut("ChangeUser")]
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

        [HttpPut("ChangePassword")]
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
    }
}