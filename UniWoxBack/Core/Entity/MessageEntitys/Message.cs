using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.MessageEntitys
{
    public class Message : BaseEntity
    {
        /* Information */
        [Required]
        public string SenderName { get; set; }
        [MinLength(1)]
        public string MessageText { get; set; }
        [Required]
        public DateTime DateSender { get; set; }
        [Required]
        public bool IsEdited { get; set; }

        /* Sent file */
        [ForeignKey("MessageFiles")]
        public string FilesId { get; set; }
        public virtual MessageFiles Files { get; set; }

        /* Sender */
        [Required]
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        /* Communication Room */
        [Required]
        [ForeignKey("MessageBox")]
        public string MessageBoxId { get; set; }
        public virtual MessageBox MessageBox { get; set; }
    }
}
