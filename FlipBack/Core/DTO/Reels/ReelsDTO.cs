using Microsoft.AspNetCore.Http;

namespace Core.DTO.Reels
{
    public class ReelsDTO
    {
        public string Description { get; set; }
        public DateTime DatePosted { get; set; }
        public int Views { get; set; }
        public bool IsPremium { get; set; }
        public bool IsBlocked { get; set; }

        public IFormFile file { get; set; }
    }
}
