using Core.DTO.Notification;
using Core.Entity.UserEntitys;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace FlipBack.Hubs
{
    public class NotificationHub : Hub
    {
        private readonly UserManager<User> _userManager;
        private readonly DataBase _context;

        public NotificationHub(UserManager<User> userManager, DataBase context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task SendNotification(string senderId, string recipientId, NotificationType type)
        {
            var user = await _userManager.FindByIdAsync(senderId);
            if (user == null)
                return;

            var user2 = await _userManager.FindByIdAsync(recipientId);
            if (user2 == null)
                return;

            if (Clients.User(recipientId) == null)
                return;

            if (senderId == recipientId)
                return;

            if (_context.Notification.Any(x => x.SenderId == senderId && type == NotificationType.Follow && x.Type == type))
                return;

            await _context.Notification.AddAsync(new Core.Entity.Notification.Notification { DateCreate = DateTime.UtcNow, Type = type, SenderId = senderId, RecipientId = recipientId });
            await _context.SaveChangesAsync();

            await Clients.User(recipientId).SendAsync("ReceiveNotification", senderId, recipientId, type);
        }
    }
}
