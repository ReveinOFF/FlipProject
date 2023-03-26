namespace Core.DTO.Notification
{
    public class GetNotificationDTO
    {
        public string Id { get; set; }
        public NotificationType Type { get; set; }
        public DateTime DateCreate { get; set; }
        public string SenderId { get; set; }
        public string SenderName { get; set; }
        public string SenderImage { get; set;}
        public bool IsFollowed { get; set; }
        public string LikeUrl { get; set; }
    }
}
