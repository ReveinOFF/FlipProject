using AutoMapper;
using Core.DTO.Post;
using Core.DTO.Reels;
using Core.DTO.User;
using Core.Entity.PostEntitys;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UniWoxBack.Controllers
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
            var posts = await _context.Post
                .Include(i => i.Files)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.User)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.PostAnswers)
                .ThenInclude(t => t.User)

                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)

                .ToListAsync();
            if (posts == null)
                BadRequest("The posts was not found!");

            var mappost = _mapper.Map<List<GetPostDTO>>(posts);

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
