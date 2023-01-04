using AutoMapper;
using Core.DTO.User;
using Core.Entity.PostEntitys;
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

            var getUser = _mapper.Map<GetUserDTO>(user);

            return Ok(getUser);
        }

        [HttpPut("EditImageUser")]
        public async Task<IActionResult> EditImageUser(string userId, IFormFile file)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return BadRequest("User not found!");

            string fileDestDir = Path.Combine("Resources", "UserImage", user.Id);

            bool deleteFile = StaticFiles.DeleteImageAsync(user.UserImage);
            if (!deleteFile)
                return BadRequest("Image not found!");

            var newImage = await StaticFiles.CreateImageAsync(_env, fileDestDir, file);

            if (newImage == null)
                return BadRequest("The link to the file was not created!");

            user.UserImage = newImage;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest("Error in changing user image!");

            return Ok();
        }

        [HttpDelete("DeleteImageUser")]
        public async Task<IActionResult> DeleteImageUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return BadRequest("User not found!");

            bool deleteFile = StaticFiles.DeleteImageAsync(user.UserImage);
            if (!deleteFile)
                return BadRequest("Image not found!");

            user.UserImage = null;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest("Error when deleting a user's image!");

            return Ok();
        }

        [HttpPut("ChangeUser")]
        public async Task<IActionResult> ChangeUser([FromBody] ChangeUserDTO changeUser)
        {
            var user = await _userManager.FindByIdAsync(changeUser.Id);

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
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePassword)
        {
            var user = await _userManager.FindByIdAsync(changePassword.Id);

            if (user == null)
                return BadRequest("User not found!");

            var result = await _userManager.ChangePasswordAsync(user, changePassword.OldPassword, changePassword.NewPassword);

            if (!result.Succeeded)
                return BadRequest("Error in changing password!");

            return Ok();
        }

        [HttpGet("GetSavedPosts")]
        public async Task<IActionResult> GetSavedPosts(string userId)
        {
            var user = await _userManager.Users.Where(x => x.Id == userId)
                .Include(x => x.SavedPosts).FirstOrDefaultAsync();

            if (user == null)
                return BadRequest("User not found!");

            if (!user.SavedPosts.Any())
                return BadRequest("Saved post not found!");

            return Ok(user.SavedPosts.Select(x => x.Post).ToList());
        }

        [HttpPost("SavePost")]
        public async Task<IActionResult> SavePost(string userId, string postId)
        {
            var savedPost = await _context.UserPost.Where(x => x.UserId == userId && x.PostId == postId).FirstOrDefaultAsync();

            if (savedPost == null)
            {
                UserPost userPost = new UserPost { PostId = postId, UserId = userId };

                await _context.UserPost.AddAsync(userPost);
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.UserPost.Remove(savedPost);
            }
            
            return Ok();
        }
    }
}