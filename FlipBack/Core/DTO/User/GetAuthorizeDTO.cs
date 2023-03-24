namespace Core.DTO.User
{
    public class GetAuthorizeDTO
    {
        public string Id { get; set; }
        public string City { get; set; }
        public DateTime LastOnline { get; set; }
        public string Device { get; set; }
        public string Browser { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
