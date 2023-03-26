using AutoMapper;
using Core.DTO.Message;
using Core.Entity.MessageEntitys;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace FlipBack.Hubs
{
    public class ChatHub : Hub
    {
        private readonly DataBase _context;
        private readonly UserManager<User> _userManager;
        private readonly IWebHostEnvironment _env;
        private readonly IMapper _mapper;

        public ChatHub(DataBase context, UserManager<User> userManager, IWebHostEnvironment env, IMapper mapper) 
        {
            _context = context;
            _userManager = userManager;
            _env = env;
            _mapper = mapper;
        }

        public async Task JoinRoom(string RoomId)
        {
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
            room.LastSendMessage = DateTime.UtcNow;

            _context.MessageBox.Update(room);
            await _context.Message.AddAsync(chatMessage);
            await _context.SaveChangesAsync();

            var getMessage = _mapper.Map<GetMessageDTO>(chatMessage);

            await Clients.Group(roomId).SendAsync("ReceiveMessage", getMessage);
        }

        public async Task UserTyping(string roomId, string sUserId, bool isTyping)
        {
            await Clients.Group(roomId).SendAsync("ReceiveTyping", sUserId, isTyping);
        }
    }
}
