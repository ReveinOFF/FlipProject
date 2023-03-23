using AutoMapper;
using Core.DTO.Message;
using Core.Entity.MessageEntitys;
using Core.Entity.UserEntitys;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlipBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessageBoxController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly DataBase _context;
        private readonly IMapper _mapper;

        public MessageBoxController(UserManager<User> userManager, DataBase context, IMapper mapper)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("get-message-boxs")]
        public async Task<IActionResult> GetMessageBoxs()
        {
            string userId = User.FindFirst("UserId")?.Value;

            var findUser = await _userManager.Users.Where(x => x.Id == userId)
                .Include(i => i.MessageBoxs).ThenInclude(t => t.Users)
                .Include(i => i.MessageBoxs).ThenInclude(t => t.Messages)
                .FirstOrDefaultAsync();

            if (findUser == null)
                return NotFound("User not found!");

            if (!findUser.MessageBoxs.Any())
                return Ok();

            var list = findUser.MessageBoxs.OrderBy(o => o.LastSendMessage).ToList();
            var getMessageBox = _mapper.Map<List<GetMessageBoxDTO>>(list);

            return Ok(getMessageBox);
        }

        [HttpPost("create-message-boxs")]
        public async Task<IActionResult> CreateMessageBoxs([FromBody] string userId)
        {
            string idUser = User.FindFirst("UserId")?.Value;

            var findMyUser = await _userManager.Users.Where(x => x.Id == idUser).FirstOrDefaultAsync();

            if (findMyUser == null) 
                return NotFound("User not found!");

            var findUser = await _userManager.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();

            if (findUser == null) 
                return NotFound("User not found!");

            var findBox = await _context.MessageBox.Where(x => x.Users.Any(x => x.Id == findUser.Id && x.Id == findMyUser.Id)).Include(i => i.Users).FirstOrDefaultAsync();

            if (findBox != null) 
                return BadRequest("A room for these users already exists!");

            var messageBox = new MessageBox();
            _context.Users.Attach(findMyUser);
            _context.Users.Attach(findUser);
            messageBox.Users = new List<User> { findUser, findMyUser };
            messageBox.LastSendMessage = DateTime.UtcNow;

            await _context.MessageBox.AddAsync(messageBox);
            await _context.SaveChangesAsync();

            return Ok(messageBox.Id);
        }

        [HttpDelete("delete-message-boxs/{id}")]
        public async Task<IActionResult> DeleteMessageBoxs(string id)
        {
            var findBox = await _context.MessageBox.Where(x => x.Id == id).FirstOrDefaultAsync();

            if (findBox == null) 
                return NotFound("No correspondence room found!");

            _context.Entry(findBox).State = EntityState.Deleted;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
