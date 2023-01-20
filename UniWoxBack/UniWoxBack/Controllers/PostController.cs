using AutoMapper;
using Core.DTO.Post;
using Core.DTO.User;
using Core.Entity.PostEntitys;
using Core.Entity.UserEntitys;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UniWoxBack.Controllers
{
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

        [HttpPost("remove-reaction")]
        public async Task<IActionResult> RemoveReaction([FromBody] PostReactionDTO reactionDTO)
        {
            var postreaction = _context.PostReaction.Where(x => x.UserId.Equals(reactionDTO.UserId) && x.PostId.Equals(reactionDTO.PostId)).FirstOrDefault();
            if (postreaction == null)
                BadRequest("Your reaction to this post is not there!");

            _context.PostReaction.Remove(postreaction);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("get-reaction")]
        public async Task<IActionResult> GetUserReaction(string postid)
        {
            var reactionusers = await _context.Post
                .Where(x => x.Id == postid)
                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)
                .Select(s => s.Reactions.Select(e => e.User))
                .ToListAsync();
            if (reactionusers == null)
                BadRequest("There are no reactions in this post!");

            var users = _mapper.Map<List<GetUsersDTO>>(reactionusers);

            return Ok(users);
        }
    }
}
