using AutoMapper;
using Core.DTO.History;
using Core.Entity.History;
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
    public class HistoryController : ControllerBase
    {
        private readonly DataBase _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;

        public HistoryController(DataBase context, IMapper mapper, IWebHostEnvironment env, UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _env = env;
            _userManager = userManager;
        }

        [HttpGet("get-user-history/{userId}")]
        public async Task<IActionResult> GetUserHistory(string userId)
        {
            var user = await _userManager.Users.Include(i => i.Histories).FirstOrDefaultAsync(f => f.Id == userId);

            if (user == null)
                return NotFound("User not found!");

            var histories = user.Histories.Where(w => w.Expires > DateTime.UtcNow).OrderByDescending(o => o.DateCreate).ToList();

            if (histories == null)
                return NotFound("No stories found!");

            var map = _mapper.Map<List<GetHistoryDTO>>(histories);

            return Ok(map);
        }

        [HttpGet("get-history/{id}")]
        public async Task<IActionResult> GetHistory(string id)
        {
            var history = await _context.Histories.Include(i => i.Reactions).Include(i => i.User).FirstOrDefaultAsync(f => f.Id == id);

            if (history == null)
                return NotFound("History not found!");

            if (history.Expires < DateTime.UtcNow)
                return BadRequest("The time for this story is over!");

            var map = _mapper.Map<GetHistoryDTO>(history);

            return Ok(map);
        }

        [HttpPost("add-history")]
        public async Task<IActionResult> AddHistory(IFormFile File)
        {
            string userId = User.FindFirst("UserId")?.Value;

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return NotFound("User not found!");

            string fileDestDir = Path.Combine("Resources", "HistoryFiles", user.Id);
            var file = await StaticFiles.CreateFileAsync(_env, fileDestDir, File);

            var history = new History { DateCreate = DateTime.UtcNow, Expires = DateTime.UtcNow.AddDays(1), UserId = user.Id, FileName = file.FileName, PathName = file.FilePath };

            await _context.Histories.AddAsync(history);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("delete-history/{id}")]
        public async Task<IActionResult> DeleteHistory(string id)
        {
            var history = await _context.Histories.Include(i => i.Reactions).FirstOrDefaultAsync(f => f.Id == id);

            if (history == null)
                return NotFound("History not found!");

            StaticFiles.DeleteFileAsync(history.PathName);

            _context.Histories.Remove(history);
            _context.HistoryReactions.RemoveRange(history.Reactions);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
