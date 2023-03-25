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
            string userId = User.FindFirst("UserId")?.Value;

            var user = await _userManager.Users
                    .Where(x => x.Id == userId)
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

        [HttpGet("search-users/{name}")]
        public async Task<IActionResult> SearchUsers(string name)
        {
            string userId = User.FindFirst("UserId")?.Value;

            var user = await _userManager.Users
                .Where(x => x.Name.ToLower().Contains(name.ToLower()) || x.UserName.ToLower().Contains(name.ToLower()))
                .ToListAsync();

            if (user == null) 
                return Ok();

            var getUser = _mapper.Map<List<GetUsersDTO>>(user.Where(x => x.Id != userId).ToList());

            return Ok(getUser);
        }

        [HttpPost("follow")]
        public async Task<IActionResult> FollowUser([FromBody] FollowDTO followDTO)
        {
            var follow = await _context.Follows
                    .FirstOrDefaultAsync(u => u.FollowerId == followDTO.FollowId &&
                                              u.FollowingId == followDTO.UserId);

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
                    .FirstOrDefaultAsync(u => u.FollowerId == followId &&
                                              u.FollowingId == userid);

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

        [HttpGet("get-followers/{id}/check/{userId}")]
        public async Task<IActionResult> GetFollowers(string id, string userId)
        {
            var myUserFollowers = await _context.Follows
                .Include(i => i.Follower)
                .ThenInclude(t => t.Followers)
                .Include(i => i.Following)
                .ThenInclude(t => t.Followings)
                .Where(x => x.FollowerId == id)
                .ToListAsync();

            if (myUserFollowers == null)
                return BadRequest("The user was not found!");

            var userFollowers = myUserFollowers.Select(s => s.Follower).ToList();

            var follow = _mapper.Map<List<GetFollowsDTO>>(userFollowers);

            follow.ForEach(x => x.IsFollowed = userFollowers.Select(s => s.Followers.Any(a => a.FollowingId == userId && a.FollowerId == x.Id)).FirstOrDefault());

            return Ok(follow);
        }

        [HttpGet("get-following/{id}/check/{userId}")]
        public async Task<IActionResult> GetFollowing(string id, string userId)
        {
            var myUserFollowing = await _userManager.Users
                .Where(x => x.Id == id)
                .Include(i => i.Followers)
                .ThenInclude(t => t.Follower)
                .ThenInclude(t => t.Followers)
                .Include(i => i.Followings)
                .ThenInclude(t => t.Following)
                .ThenInclude(t => t.Followings)
                .FirstOrDefaultAsync();

            if (myUserFollowing == null)
                return BadRequest("The user was not found!");

            var userFollowing = myUserFollowing.Followings.Select(s => s.Following).ToList();

            var follow = _mapper.Map<List<GetFollowsDTO>>(userFollowing);

            follow.ForEach(x => x.IsFollowed = userFollowing.Select(s => s.Followers.Any(a => a.FollowingId == userId && a.FollowerId == x.Id)).FirstOrDefault());

            return Ok(follow);
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