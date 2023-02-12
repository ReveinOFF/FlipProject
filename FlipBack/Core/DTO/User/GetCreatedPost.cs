namespace Core.DTO.User
{
    public class GetCreatedPost
    {
        public string Id { get; set; }
        public ICollection<string> File { get; set; }
    }
}
