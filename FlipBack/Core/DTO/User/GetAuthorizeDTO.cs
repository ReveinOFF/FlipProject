namespace Core.DTO.User
{
    public class GetAuthorizeDTO
    {
        public string Id { get; set; }
        public string City { get; set; }
        public DateTime LastOnline { get; set; }
        public string Device { get; set; }
        public string Location { get; set; }
    }
}
