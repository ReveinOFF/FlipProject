namespace Core.DTO.Notification
{
    public class NotificationDTO
    {
        public string SenderId { get; set; }
        public string RecipientId { get; set; }
        public NotificationType Type { get; set; }
    }
}
