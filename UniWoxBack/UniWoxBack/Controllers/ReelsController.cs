using AutoMapper;
using Core.DTO.Reels;
using Core.DTO.User;
using Core.Entity.PostEntitys;
using Core.Entity.ReelsEntity;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UniWoxBack.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReelsController : ControllerBase
    {
        private readonly DataBase _context;
        private readonly IMapper _mapper;
        public ReelsController(DataBase context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("get-reels")]
        public async Task<IActionResult> GetReels()
        {
            var reels = await _context.Reels
                .Include(i => i.Files)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.User)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.ReelsAnswers)
                .ThenInclude(t => t.User)

                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)

                .ToListAsync();
            if (reels == null)
                BadRequest("The reels was not found!");

            var mapreels = _mapper.Map<List<GetReelsDTO>>(reels);

            return Ok(mapreels);
        }

        [HttpGet("get-reels/{id}")]
        public async Task<IActionResult> GetReelsById(string id)
        {
            var reels = await _context.Reels
                .Where(i => i.Id == id)
                .Include(i => i.Files)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.User)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.ReelsAnswers)
                .ThenInclude(t => t.User)

                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)

                .FirstOrDefaultAsync();
            if (reels == null)
                BadRequest("The reels was not found!");

            var mappost = _mapper.Map<GetReelsDTO>(reels);

            return Ok(mappost);
        }

        [HttpPost("add-reaction")]
        public async Task<IActionResult> AddReaction([FromBody] ReelsReactionDTO reactionDTO)
        {
            var reelsreaction = _context.ReelsReaction.Where(x => x.UserId.Equals(reactionDTO.UserId) && x.ReelsId.Equals(reactionDTO.ReelsID)).FirstOrDefault();
            if (reelsreaction != null)
                BadRequest("You've already put a reaction to this reels!");

            await _context.ReelsReaction.AddAsync(new ReelsReaction { ReelsId = reactionDTO.ReelsID, UserId = reactionDTO.UserId });
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("remove-reaction")]
        public async Task<IActionResult> RemoveReaction([FromBody] ReelsReactionDTO reactionDTO)
        {
            var reelsreaction = _context.ReelsReaction.Where(x => x.UserId.Equals(reactionDTO.UserId) && x.ReelsId.Equals(reactionDTO.ReelsID)).FirstOrDefault();
            if (reelsreaction == null)
                BadRequest("Your reaction to this reels is not there!");

            _context.ReelsReaction.Remove(reelsreaction);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("get-reaction/{reelsid}")]
        public async Task<IActionResult> GetUserReaction(string reelsid)
        {
            var reactionusers = await _context.Reels
                .Where(x => x.Id == reelsid)
                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)
                .SelectMany(x => x.Reactions.Select(x => x.User)).ToListAsync();
            if (reactionusers == null)
                BadRequest("There are no reactions in this reels!");

            var users = _mapper.Map<List<GetUsersDTO>>(reactionusers);

            return Ok(users);
        }
    }
}
