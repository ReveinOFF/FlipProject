using Microsoft.AspNetCore.Http;

namespace Core.DTO.Reels
{
    public class ReelsDTO
    {
        public string Description { get; set; }

        public IFormFile file { get; set; }
    }
}
