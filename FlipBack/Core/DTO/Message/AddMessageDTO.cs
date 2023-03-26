using Microsoft.AspNetCore.Http;

namespace Core.DTO.Message
{
    public class AddMessageDTO
    {
        public string MessageBoxId { get; set; }
        public string Message { get; set; } 
        public IFormFileCollection Files { get; set; }
    }
}
