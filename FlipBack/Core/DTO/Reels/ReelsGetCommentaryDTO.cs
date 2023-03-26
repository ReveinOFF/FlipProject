namespace Core.DTO.Reels
{
    public class ReelsGetCommentaryDTO
    {
        public string Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public DateTime DateCreate { get; set; }
        public string UserId { get; set; }
        public string ReelsId { get; set; }
    }
}
