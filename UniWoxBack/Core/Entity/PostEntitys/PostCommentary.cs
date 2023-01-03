using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.PostEntitys
{
    public class PostCommentary : BaseEntity
    {
        /* Information */
        [Required]
        [MaxLength(100)]
        public string Text { get; set; }
        [Required]
        public DateTime DateCreate { get; set; }

        /* The person who wrote the commentary */
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        /* Which post to attach it to */
        [ForeignKey("Post")]
        public string PostId { get; set; }
        public virtual Post Post { get; set; }

        /* All Answers to Comments */
        public virtual ICollection<PostAnswer> PostAnswers { get; set; }
    }
}
