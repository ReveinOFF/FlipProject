namespace Core.DTO.Message
{
    public class GetMessageDTO
    {
        public string Id { get; set; }
        public string MessageText { get; set; }
        public DateTime DateSender { get; set; }
        public bool IsEdited { get; set; }
        public string UserId { get; set; }
        public List<string> Files { get; set; }
    }
}
