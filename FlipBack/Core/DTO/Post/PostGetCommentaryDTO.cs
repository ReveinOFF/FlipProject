namespace Core.DTO.Post
{
    public class PostGetCommentaryDTO
    {
        public string Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public DateTime DateCreate { get; set; }
        public string UserId { get; set; }
        public string PostId { get; set; }

        public ICollection<PostGetAnswerDTO> Answer { get; set; }
    }
}
