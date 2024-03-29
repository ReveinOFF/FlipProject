﻿using AutoMapper;
using Core.DTO.Message;
using Core.Helpers;
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
    public class MessageController : ControllerBase
    {
        private readonly DataBase _context;
        private readonly IMapper _mapper;

        public MessageController(DataBase context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("get-messages/{messageBoxId}")]
        public async Task<IActionResult> GetMessages(string messageBoxId)
        {
            string userId = User.FindFirst("UserId")?.Value;

            var messageBox = await _context.MessageBox.Include(i => i.Messages).ThenInclude(t => t.Files).Include(i => i.Users).FirstOrDefaultAsync(x => x.Id == messageBoxId);

            if (messageBox == null) 
                return NotFound("No correspondence room found!");

            var list = _mapper.Map<List<GetMessageDTO>>(messageBox.Messages.OrderBy(o => o.DateSender).ToList());

            var user = messageBox.Users.FirstOrDefault(x => x.Id != userId);

            if (user == null)
                return NotFound("User not found!");

            var messageObject = new { Messages = list, NameUser = user.Name, UserImage = user.UserImage, UserId = user.Id };

            return Ok(messageObject);
        }

        [HttpDelete("delete-message/{id}")]
        public async Task<IActionResult> DeleteMessage(string id)
        {
            var message = await _context.Message.Include(i => i.Files).FirstOrDefaultAsync(x => x.Id == id);

            if (message == null) 
                return NotFound("This letter was not found!");

            _context.Entry(message).State = EntityState.Deleted;
            await _context.SaveChangesAsync();

            if (message.Files != null)
            {
                var list = message.Files;

                foreach (var item in list)
                {
                    StaticFiles.DeleteFileAsync(item.PathName);

                    _context.Entry(item).State = EntityState.Deleted;
                    await _context.SaveChangesAsync();
                }
            }

            return Ok();
        }

        [HttpDelete("delete-file/{messageId}/{fileId}")]
        public async Task<IActionResult> DeleteFile(string messageId, string fileId)
        {
            var message = await _context.Message.Include(i => i.Files).FirstOrDefaultAsync(x => x.Id == messageId);

            if (message == null) 
                return NotFound("This letter was not found!");

            var file = message.Files.FirstOrDefault(x => x.Id == fileId);

            if (file == null) 
                return NotFound("This file was not found!");

            _context.Entry(file).State = EntityState.Deleted;
            await _context.SaveChangesAsync();

            StaticFiles.DeleteFileAsync(file.PathName);

            return Ok();
        }

        [HttpPut("edit-message")]
        public async Task<IActionResult> EditMessage(EditMessageDTO messageDTO)
        {
            var oldMessage = await _context.Message.FirstOrDefaultAsync(x => x.Id == messageDTO.Id);

            if (oldMessage == null) 
                return NotFound("This letter was not found!");

            oldMessage.MessageText = messageDTO.Message;
            oldMessage.IsEdited = true;

            _context.Message.Update(oldMessage);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
