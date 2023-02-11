using AutoMapper;
using Core.DTO.User;
using Core.Entity.PostEntitys;
using Core.Entity.ReelsEntity;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlipBack.Controllers
{
    [Authorize]
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

        [HttpGet("get-user-auth")]
        public async Task<IActionResult> GetUserAuth()
        {
            string username = User.FindFirst("UserName")?.Value;

            var user = await _userManager.Users
                    .Where(x => x.UserName == username)
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

        [HttpGet("get-user-by-id/{id}")]
        public async Task<IActionResult> GetUserById(string id)
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

        [HttpGet("get-user-by-name/{name}")]
        public async Task<IActionResult> GetUserByName(string name)
        {
            var user = await _userManager.Users
                    .Where(x => x.Name == name)
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

        [HttpGet("get-users")]
        public async Task<IActionResult> GetUsers()
        {
            var user = await _userManager.Users
                .Include(x => x.Followers)
                .ThenInclude(x => x.Follower)
                .OrderByDescending(x => x.Followers.Count)
                .ToListAsync();

            if (user == null)
                return BadRequest("User not found!");

            var getUser = _mapper.Map<List<GetUsersDTO>>(user);

            return Ok(getUser);
        }

        [HttpPost("follow")]
        public async Task<IActionResult> FollowUser([FromBody] FollowDTO followDTO)
        {
            var follow = await _context.Follows
                    .FirstOrDefaultAsync(u => u.FollowerId == followDTO.UserId &&
                                              u.FollowingId == followDTO.FollowId);

            if (follow != null)
                return BadRequest("You already followed this user!");

            if (await GetUserById(followDTO.FollowId) == null)
                return NotFound("The user with this id was not found!");

            follow = new Follow
            {
                FollowerId = followDTO.FollowId,
                FollowingId = followDTO.UserId
            };

            await _context.Follows.AddAsync(follow);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{userid}/unfollow/{followId}")]
        public async Task<IActionResult> UnFollowUser(string userid, string followId)
        {
            var follow = await _context.Follows
                    .FirstOrDefaultAsync(u => u.FollowerId == userid &&
                                              u.FollowingId == followId);

            if (follow == null)
                return BadRequest("User not found!");

            _context.Follows.Remove(follow);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("check/{myUserId}/follow/{checkUserId}")]
        public async Task<IActionResult> CheckFollow(string myUserId, string checkUserId)
        {
            var user = await _context.Users
                .Include(x => x.Followings)
                .FirstOrDefaultAsync(u => u.Id == myUserId);

            if (user == null)
                return BadRequest("The user was not found!");

            var userFollower = user.Followings.Where(u => u.FollowerId == checkUserId).FirstOrDefault();

            if (userFollower == null)
                return Ok(false);

            return Ok(true);
        }

        [HttpGet("get-followers/{id}")]
        public async Task<IActionResult> GetFollowers(string id)
        {
            var user = await _context.Users
                .Include(x => x.Followers)
                .ThenInclude(y => y.Follower)
                .OrderByDescending(o => o.Followers.Count)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return BadRequest("The user was not found!");

            var userFollowers = user.Followers.Where(u => u.FollowingId == id).Select(x => x.Follower);

            var follow = _mapper.Map<List<GetUsersDTO>>(userFollowers);

            return Ok(follow);
        }

        [HttpGet("get-following/{id}")]
        public async Task<IActionResult> GetFollowing(string id)
        {
            var user = await _context.Users
                .Include(x => x.Followings)
                .ThenInclude(y => y.Following)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return BadRequest("The user was not found!");

            var userFollowers = user.Followings.Where(u => u.FollowingId == id).Select(x => x.Following);

            var follow = _mapper.Map<List<GetUsersDTO>>(userFollowers);

            return Ok(follow);
        }

        [HttpPost("add-image-user/{userId}")]
        public async Task<IActionResult> AddImageUser(string userId, IFormFile file)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return BadRequest("User not found!");

            if (user.UserImagePath != null)
            {
                bool deleteFile = StaticFiles.DeleteImageAsync(user.UserImagePath);
                if (!deleteFile)
                    return BadRequest("Image not found!");
            }

            string fileDestDir = Path.Combine("Resources", "UserImage", user.Id);

            var newImage = await StaticFiles.CreateImageAsync(_env, fileDestDir, file);

            if (newImage.FilePath == null)
                return BadRequest("The link to the file was not created!");

            if (newImage.FileName == null)
                return BadRequest("The name to the file was not created!");

            user.UserImage = newImage.FileName;
            user.UserImagePath = newImage.FilePath;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest("Error in changing user image!");

            return Ok();
        }

        [HttpDelete("delete-image-user/{userId}")]
        public async Task<IActionResult> DeleteImageUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return BadRequest("User not found!");

            bool deleteFile = StaticFiles.DeleteImageAsync(user.UserImagePath);
            if (!deleteFile)
                return BadRequest("Image not found!");

            user.UserImage = null;
            user.UserImagePath = null;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest("Error when deleting a user's image!");

            return Ok();
        }

        [HttpPut("change-user")]
        public async Task<IActionResult> ChangeUser([FromBody] ChangeUserDTO changeUser)
        {
            var user = await _userManager.FindByIdAsync(changeUser.Id);

            if (user == null)
                return BadRequest("User not found!");

            user.Name = changeUser.Name;
            user.Description = changeUser.Description;
            user.DateOfBirth = changeUser.DateOfBirth;
            user.IsPrivateUser = changeUser.IsPrivateUser;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest("Error in changing user data!");

            return Ok();
        }

        [HttpPut("change-password")]
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

        [HttpGet("get-bookmarks-post")]
        public async Task<IActionResult> GetBookmarksPost()
        {
            string userId = User.FindFirst("UserId")?.Value;

            var post = await _userManager.Users.Where(x => x.Id == userId)
                .Include(x => x.SavedPosts).ThenInclude(t => t.Post)
                .SelectMany(s => s.SavedPosts.Select(ss => ss.Post))
                .Reverse().ToListAsync();

            if (post == null)
                return BadRequest("Saved post not found!");

            return Ok(post);
        }

        [HttpPost("add-bookmarks-post")]
        public async Task<IActionResult> AddBookmarksPost(string postId, string reelsId)
        {
            string userId = User.FindFirst("UserId")?.Value;

            var savedPost = await _context.UserPost.Where(x => x.UserId == userId && x.PostId == postId).FirstOrDefaultAsync();

            if (savedPost != null)
                return BadRequest("A user has already saved this post!");

            UserPost userPost = new UserPost { PostId = postId, UserId = userId };

            await _context.UserPost.AddAsync(userPost);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("remove-bookmarks-post/{postId}")]
        public async Task<IActionResult> RemoveBookmarksPost(string postId)
        {
            string userId = User.FindFirst("UserId")?.Value;

            var savedPost = await _context.UserPost.Where(x => x.UserId == userId && x.PostId == postId).FirstOrDefaultAsync();

            if (savedPost == null)
                return BadRequest("The user did not save this post!");

            _context.UserPost.Remove(savedPost);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("get-bookmarks-reels")]
        public async Task<IActionResult> GetBookmarksReels()
        {
            string userId = User.FindFirst("UserId")?.Value;

            var reels = await _userManager.Users.Where(x => x.Id == userId)
                .Include(x => x.SavedReels).ThenInclude(t => t.Reels)
                .SelectMany(s => s.SavedReels.Select(ss => ss.Reels))
                .Reverse().ToListAsync();

            if (reels == null)
                return BadRequest("Saved post not found!");

            return Ok(reels);
        }

        [HttpPost("add-bookmarks-reels")]
        public async Task<IActionResult> AddBookmarksReels(string reelsId)
        {
            string userId = User.FindFirst("UserId")?.Value;

            var savedReels = await _context.UserReels.Where(x => x.UserId == userId && x.ReelsId == reelsId).FirstOrDefaultAsync();

            if (savedReels != null)
                return BadRequest("A user has already saved this reels!");

            UserReels userReels = new UserReels { ReelsId = reelsId, UserId = userId };

            await _context.UserReels.AddAsync(userReels);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("remove-bookmarks-reels/{reelsId}")]
        public async Task<IActionResult> RemoveBookmarksReels(string reelsId)
        {
            string userId = User.FindFirst("UserId")?.Value;

            var savedReels = await _context.UserReels.Where(x => x.UserId == userId && x.ReelsId == reelsId).FirstOrDefaultAsync();

            if (savedReels == null)
                return BadRequest("The user did not save this post!");

            _context.UserReels.Remove(savedReels);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}