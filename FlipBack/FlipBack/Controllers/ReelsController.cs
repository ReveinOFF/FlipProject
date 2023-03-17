using AutoMapper;
using Core.DTO.Reels;
using Core.DTO.User;
using Core.Entity.ReelsEntity;
using Core.Helpers;
using FlipBack.Constans;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace FlipBack.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReelsController : ControllerBase
    {
        private readonly DataBase _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;
        public ReelsController(DataBase context, IMapper mapper, IWebHostEnvironment env)
        {
            _context = context;
            _mapper = mapper;
            _env = env;
        }

        [HttpGet("get-reels")]
        public async Task<IActionResult> GetReels()
        {
            var reels = await _context.Reels
                .Include(i => i.File)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.User)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.ReelsAnswers)
                .ThenInclude(t => t.User)

                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)

                .OrderByDescending(o => o.DatePosted)

                .ToListAsync();

            if (reels == null)
                return BadRequest("The reels was not found!");

            var mappost = _mapper.Map<List<GetReelsDTO>>(reels);

            return Ok(mappost);
        }

        [HttpGet("get-reels/{id}")]
        public async Task<IActionResult> GetReelsById(string id)
        {
            var reels = await _context.Reels
                .Where(i => i.Id == id)
                .Include(i => i.File)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.User)

                .Include(i => i.Commentary)
                .ThenInclude(t => t.ReelsAnswers)
                .ThenInclude(t => t.User)

                .Include(i => i.Reactions)
                .ThenInclude(t => t.User)

                .FirstOrDefaultAsync();
            if (reels == null)
                return BadRequest("This reels was not found!");

            var mappost = _mapper.Map<GetReelsDTO>(reels);

            return Ok(mappost);
        }

        [HttpPost("add-reels")]
        public async Task<IActionResult> AddReels(ReelsDTO reelsDTO)
        {
            var reels = _mapper.Map<Reels>(reelsDTO);

            string fileDestDir = Path.Combine("Resources", "ReelsFiles", reels.Id);
            var file = await StaticFiles.CreateFileAsync(_env, fileDestDir, reelsDTO.file);

            reels.File.PathName = file.FilePath;
            reels.File.FileName = file.FileName;
            reels.DatePosted = DateTime.UtcNow;
            reels.Views = 0;
            reels.IsBlocked = false;
            reels.IsPremium = false;

            await _context.Reels.AddAsync(reels);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("delete-reels/{id}")]
        public async Task<IActionResult> DeleteReels(string id)
        {
            var reels = await _context.Reels.Where(x => x.Id == id).FirstOrDefaultAsync();
            var reelsSave = await _context.UserReels.Where(x => x.ReelsId == id).ToListAsync();
            var reelsReaction = await _context.ReelsReaction.Where(x => x.ReelsId == id).ToListAsync();
            var reelsCommentary = await _context.ReelsCommentary.Include(x => x.ReelsAnswers).Where(x => x.ReelsId == id).ToListAsync();
            var reelsAnswer = await _context.ReelsCommentary.Include(x => x.ReelsAnswers).Where(x => x.ReelsId == id).SelectMany(x => x.ReelsAnswers).ToListAsync();
            var reelsFiles = await _context.ReelsFiles.Where(x => x.ReelsId == id).ToListAsync();

            if (reels == null)
                return BadRequest("This reels was not found!");

            if (reelsFiles != null)
                reelsFiles.ForEach(item => StaticFiles.DeleteFileAsync(item.PathName));

            _context.Reels.Remove(reels);
            _context.UserReels.RemoveRange(reelsSave);
            _context.ReelsReaction.RemoveRange(reelsReaction);
            _context.ReelsCommentary.RemoveRange(reelsCommentary);
            _context.ReelsAnswer.RemoveRange(reelsAnswer);
            _context.ReelsFiles.RemoveRange(reelsFiles);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("change-reels")]
        public async Task<IActionResult> ChangeReels(ReelsChangeDTO changeDTO)
        {
            var reels = await _context.Reels.Where(x => x.Id == changeDTO.Id).FirstOrDefaultAsync();

            if (reels == null)
                return BadRequest("This reels was not found!");

            reels.Description = changeDTO.Description;

            _context.Reels.Update(reels);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("add-reaction")]
        public async Task<IActionResult> AddReaction([FromBody] ReelsReactionDTO reactionDTO)
        {
            var reelsreaction = await _context.ReelsReaction.Where(x => x.UserId.Equals(reactionDTO.UserId) && x.ReelsId.Equals(reactionDTO.ReelsID)).FirstOrDefaultAsync();
            if (reelsreaction != null)
                return BadRequest("You've already put a reaction to this reels!");

            await _context.ReelsReaction.AddAsync(new ReelsReaction { ReelsId = reactionDTO.ReelsID, UserId = reactionDTO.UserId });
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("remove/{UserId}/reaction/{ReelsID}")]
        public async Task<IActionResult> RemoveReaction(string UserId, string ReelsID)
        {
            var reelsreaction = await _context.ReelsReaction.Where(x => x.UserId.Equals(UserId) && x.ReelsId.Equals(ReelsID)).FirstOrDefaultAsync();
            if (reelsreaction == null)
                return BadRequest("Your reaction to this reels is not there!");

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
                return BadRequest("There are no reactions in this reels!");

            var users = _mapper.Map<List<GetUsersDTO>>(reactionusers);

            return Ok(users);
        }

        [HttpPost("add-commentary")]
        public async Task<IActionResult> AddCommentary(ReelsCommentaryDTO commentaryDTO)
        {
            var map = _mapper.Map<ReelsCommentary>(commentaryDTO);
            map.DateCreate = DateTime.UtcNow;

            await _context.ReelsCommentary.AddAsync(map);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("delete-commentary/{reelsid}/{commid}")]
        public async Task<IActionResult> DeleteCommentary(string reelsid, string commid)
        {
            var comm = await _context.ReelsCommentary.Where(x => x.Id == commid && x.ReelsId == reelsid).FirstOrDefaultAsync();
            if (comm == null)
                return BadRequest("This commentary was not found!");

            _context.ReelsCommentary.Remove(comm);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("add-answer")]
        public async Task<IActionResult> AddAnswer(ReelsAnswerDTO reelsDTO)
        {
            var map = _mapper.Map<ReelsAnswer>(reelsDTO);
            map.DateCreate = DateTime.UtcNow;

            await _context.ReelsAnswer.AddAsync(map);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("delete-answer/{commid}/{answerid}")]
        public async Task<IActionResult> DeleteAnswer(string commid, string answerid)
        {
            var answer = await _context.ReelsAnswer.Where(x => x.Id == answerid && x.CommentaryId == commid).FirstOrDefaultAsync();

            if (answer == null)
                return BadRequest("This answer was not found!");

            _context.ReelsAnswer.Remove(answer);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}