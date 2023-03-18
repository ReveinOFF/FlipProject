using Microsoft.AspNetCore.Http;

namespace Core.DTO.Post
{
    public class PostDTO
    {
        public string Description { get; set; }

        public IFormFileCollection Files { get; set; }
    }
}
