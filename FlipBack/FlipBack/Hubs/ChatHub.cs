using Core.Entity.MessageEntitys;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace FlipBack.Hubs
{
    [Authorize]
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

        public async Task JoinRoom(string RoomId, string UserId, string SUserId)
        {
            var currRoom = await _context.MessageBox.FirstOrDefaultAsync(f => f.Id == RoomId);

            if (currRoom == null)
            {
                var user = await _userManager.FindByIdAsync(UserId);
                if (user == null)
                    return;

                var suser = await _userManager.FindByIdAsync(SUserId);
                if (suser == null)
                    return;

                var messageBox = new MessageBox();
                _context.Users.Attach(user);
                _context.Users.Attach(suser);
                messageBox.Users = new List<User> { user, suser };
                messageBox.LastSendMessage = DateTime.UtcNow;

                await _context.MessageBox.AddAsync(messageBox);
                await _context.SaveChangesAsync();

                await Groups.AddToGroupAsync(Context.ConnectionId, messageBox.Id);
            }
            else
                await Groups.AddToGroupAsync(Context.ConnectionId, RoomId);
        }

        public async Task LeaveRoom(string RoomId, string UserId)
        {
            var user = await _userManager.FindByIdAsync(UserId);

            if (user == null)
                return;

            var room = await _context.MessageBox.FirstOrDefaultAsync(f => f.Id == RoomId);
            
            if (room == null) return;

            if (!room.Users.Contains(user))
                return;

            room.Users.Remove(user);
            await _context.SaveChangesAsync();

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, RoomId);
        }

        public async Task SendMessage(string roomId, string userId, string message, IFormFileCollection files)
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
