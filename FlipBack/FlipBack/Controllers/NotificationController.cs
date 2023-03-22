using AutoMapper;
using Core.DTO.Notification;
using Core.Entity.Notification;
using Core.Entity.UserEntitys;
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
    public class NotificationController : ControllerBase
    {
        private readonly DataBase _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public NotificationController(DataBase context, IMapper mapper, UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet("get-all-notification")]
        public async Task<IActionResult> GetAllNotification()
        {
            string username = User.FindFirst("UserName")?.Value;

            var user = await _userManager.Users.Include(i => i.ReceivedNotifications).ThenInclude(t => t.Sender).FirstOrDefaultAsync(f => f.UserName == username);

            if (user == null) 
                return NotFound("User not found!");

            var map = _mapper.Map<List<GetNotificationDTO>>(user.ReceivedNotifications.OrderByDescending(o => o.DateCreate).ToList());

            return Ok(map);
        }

        [HttpPost("add-notification")]
        public async Task<IActionResult> AddNotification([FromBody] NotificationDTO notification)
        {
            var map = _mapper.Map<Notification>(notification);

            map.DateCreate = DateTime.UtcNow;

            await _context.Notification.AddAsync(map);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
