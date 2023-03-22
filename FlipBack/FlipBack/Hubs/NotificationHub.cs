using AutoMapper;
using Core.DTO.Notification;
using Core.Entity.UserEntitys;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace FlipBack.Hubs
{
    [Authorize]
    public class NotificationHub : Hub
    {
        private readonly UserManager<User> _userManager;
        private readonly DataBase _context;
        private readonly IMapper _mapper;

        public NotificationHub(UserManager<User> userManager, DataBase context, IMapper mapper)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
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

            var notif = new Core.Entity.Notification.Notification { DateCreate = DateTime.UtcNow, Type = type, SenderId = senderId, RecipientId = recipientId };

            await _context.Notification.AddAsync(notif);
            await _context.SaveChangesAsync();

            notif.Sender = user;
            notif.Recipient = user2;

            var notification = _mapper.Map<GetNotificationDTO>(notif);

            await Clients.User(recipientId).SendAsync("ReceiveNotification", notification);
        }
    }
}
