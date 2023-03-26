namespace Core.DTO.User
{
    public class GetCreatedPostDTO
    {
        public string Id { get; set; }
        public ICollection<string> File { get; set; }
    }
}
