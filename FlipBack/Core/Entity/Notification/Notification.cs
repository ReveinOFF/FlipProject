using Core.DTO.Notification;
using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.Notification
{
    public class Notification : BaseEntity
    {
        [Required]
        public DateTime DateCreate { get; set; }
        [Required]
        public NotificationType Type { get; set; }
        public string LikeUrl { get; set; }

        [ForeignKey("User")]
        public string SenderId { get; set; }
        public User Sender { get; set; }
        [ForeignKey("User")]
        public string RecipientId { get; set; }
        public User Recipient { get; set; }
    }
}
