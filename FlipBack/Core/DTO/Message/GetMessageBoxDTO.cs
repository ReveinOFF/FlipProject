namespace Core.DTO.Message
{
    public class GetMessageBoxDTO
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string UserImage { get; set; }
        public string Name { get; set; }
        public string LastMessage { get; set; }
    }
}
