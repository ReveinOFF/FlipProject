using Core.Entity.MessageEntitys;
using Core.Entity.UserEntitys;
using Core.Helpers;
using FlipBack.Entity;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Twilio.TwiML.Voice;

namespace FlipBack.Hubs
{
    public class ChatHub : Hub
    {
        private readonly DataBase _context;
        private readonly UserManager<User> _userManager;
        private readonly IWebHostEnvironment _env;

        public ChatHub(DataBase context, UserManager<User> userManager, IWebHostEnvironment env) 
        {
            _context = context;
            _userManager = userManager;
            _env = env;
        }

        public async System.Threading.Tasks.Task JoinRoom(string RoomId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, RoomId);
        }

        public async System.Threading.Tasks.Task LeaveRoom(string RoomId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, RoomId);
        }

        public async System.Threading.Tasks.Task SendMessage(string roomId, string userId, string message, IFormFileCollection files)
        {
            var user = await _userManager.Users.Include(i => i.MessageBoxs).FirstOrDefaultAsync(f => f.Id == userId);
            if (user == null)
                return;

            var room = await _context.MessageBox.FirstOrDefaultAsync(f => f.Id == roomId);
            if (room == null)
                return;

            if(!user.MessageBoxs.Any(a => a.Id == room.Id))
                return;

            var chatMessage = new Message
            {
                UserId = userId,
                MessageBoxId = roomId,
                MessageText = message,
                DateSender = DateTime.UtcNow
            };

            if (files != null)
            {
                chatMessage.Files = new List<MessageFiles>();

                foreach (var item in files)
                {
                    string fileDestDir = Path.Combine("Resources", "MessageFiles", room.Id);

                    var fileInfo = await StaticFiles.CreateFileAsync(_env, fileDestDir, item);
                    if (fileInfo != null)
                        chatMessage.Files.Add(new MessageFiles { MessageId = chatMessage.Id, PathName = fileInfo.FilePath, FileName = fileInfo.FileName });
                }
            }

            await _context.Message.AddAsync(chatMessage);
            await _context.SaveChangesAsync();

            await Clients.Group(roomId).SendAsync("ReceiveMessage", userId, message, chatMessage.Files.SelectMany(s => s.FileName).ToList());
        }
    }
}
