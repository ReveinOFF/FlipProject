namespace Core.DTO.Notification
{
    public class GetNotificationDTO
    {
        public int Id { get; set; }
        public NotificationType Type { get; set; }
        public bool IsViewed { get; set; }
        public DateTime DateCreate { get; set; }
        public string SenderName { get; set; }
        public string SenderImage { get; set;}
    }
}
