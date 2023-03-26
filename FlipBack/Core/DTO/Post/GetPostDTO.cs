namespace Core.DTO.Post
{
    public class GetPostDTO
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public DateTime DatePosted { get; set; }
        public int Views { get; set; }

        public int CommentaryCount { get; set; }
        public int AnswerCount { get; set; }

        public string UserImage { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }

        public bool IsFollowed { get; set; }

        public ICollection<string> File { get; set; }
        public ICollection<PostGetCommentaryDTO> Commentary { get; set; }
        public ICollection<string> Reactions { get; set; }
    }
}
