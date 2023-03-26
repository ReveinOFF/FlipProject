namespace Core.DTO.User
{
    public class GetCreatedReelsDTO
    {
        public string Id { get; set; }
        public ICollection<string> File { get; set; }
    }
}
