using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.PostEntitys
{
    public class PostAnswer : BaseEntity
    {
        /* Information */
        [Required]
        [MaxLength(100)]
        public string Text { get; set; }
        [Required]
        public DateTime DateCreate { get; set; }

        /* The person who wrote the reply */
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        /* Which comment to attach it to */
        [ForeignKey("PostCommentary")]
        public string CommentaryId { get; set; }
        public virtual PostCommentary Commentary { get; set; }
    }
}
