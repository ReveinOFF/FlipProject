using AutoMapper;
using Core.DTO.Post;
using Core.DTO.User;
using Core.Entity.PostEntitys;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlipBack.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly DataBase _context;
        private readonly IMapper _mapper;

        public PostController(DataBase context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("get-posts")]
        public async Task<IActionResult> GetPosts()
        {
            string id = User.FindFirst("UserId")?.Value;

            var posts = await _context.Post
                .Include(i => i.Files)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.User)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.PostAnswers)
                .ThenInclude(t => t.User)

                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)

                .OrderByDescending(o => o.DatePosted)

                .ToListAsync();

            var postFollowing = await _context.Users
                .Include(i => i.Followings)
                .ThenInclude(i => i.Following)
                .ThenInclude(t => t.CreatedPosts)
                .ThenInclude(t => t.Commentary)
                .ThenInclude(t => t.User)

                .Include(i => i.Followings)
                .ThenInclude(i => i.Following)
                .ThenInclude(t => t.CreatedPosts)
                .ThenInclude(t => t.Commentary)
                .ThenInclude(t => t.PostAnswers)
                .ThenInclude(t => t.User)

                .Include(i => i.Followings)
                .ThenInclude(i => i.Following)
                .ThenInclude(t => t.CreatedPosts)
                .ThenInclude(t => t.Reactions)
                .ThenInclude(t => t.User)

                .Where(w => w.Id == id)
                .SelectMany(i => i.Followings.SelectMany(x => x.Following.CreatedPosts))
                .Where(w => w.DatePosted.Day.Equals(DateTime.UtcNow.Day))
                .OrderByDescending(o => o.DatePosted)

                .ToListAsync();

            if (posts == null)
                BadRequest("The posts was not found!");

            if (postFollowing != null)
                postFollowing.ForEach(item => posts.Remove(item));

            var list = postFollowing.Concat(posts).ToList();

            var mappost = _mapper.Map<List<GetPostDTO>>(list);

            return Ok(mappost);
        }

        [HttpGet("get-post/{id}")]
        public async Task<IActionResult> GetPost(string id)
        {
            var posts = await _context.Post
                .Where(i => i.Id == id)
                .Include(i => i.Files)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.User)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.PostAnswers)
                .ThenInclude(t => t.User)

                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)

                .FirstOrDefaultAsync();
            if (posts == null)
                BadRequest("The post was not found!");

            var mappost = _mapper.Map<GetPostDTO>(posts);

            return Ok(mappost);
        }

        [HttpPost("add-reaction")]
        public async Task<IActionResult> AddReaction([FromBody] PostReactionDTO reactionDTO)
        {
            var postreaction = _context.PostReaction.Where(x => x.UserId.Equals(reactionDTO.UserId) && x.PostId.Equals(reactionDTO.PostId)).FirstOrDefault();
            if (postreaction != null)
                BadRequest("You've already put a reaction to this post!");

            await _context.PostReaction.AddAsync(new PostReaction { PostId = reactionDTO.PostId, UserId = reactionDTO.UserId });
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("remove-reaction")]
        public async Task<IActionResult> RemoveReaction([FromBody] PostReactionDTO reactionDTO)
        {
            var postreaction = _context.PostReaction.Where(x => x.UserId.Equals(reactionDTO.UserId) && x.PostId.Equals(reactionDTO.PostId)).FirstOrDefault();
            if (postreaction == null)
                BadRequest("Your reaction to this post is not there!");

            _context.PostReaction.Remove(postreaction);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("get-reaction/{postid}")]
        public async Task<IActionResult> GetUserReaction(string postid)
        {
            var reactionusers = await _context.Post
                .Where(x => x.Id == postid)
                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)
                .SelectMany(x => x.Reactions.Select(x => x.User)).ToListAsync();
            if (reactionusers == null)
                BadRequest("There are no reactions in this post!");

            var users = _mapper.Map<List<GetUsersDTO>>(reactionusers);

            return Ok(users);
        }
    }
}
