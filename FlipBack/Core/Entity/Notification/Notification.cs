using Core.DTO.Notification;
using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.Notification
{
    public class Notification : BaseEntity
    {
        public DateTime DateCreate { get; set; }
        public bool IsViewed { get; set; }
        public NotificationType Type { get; set; }

        [ForeignKey("User")]
        public string SenderId { get; set; }
        public User Sender { get; set; }
        [ForeignKey("User")]
        public string RecipientId { get; set; }
        public User Recipient { get; set; }
    }
}
