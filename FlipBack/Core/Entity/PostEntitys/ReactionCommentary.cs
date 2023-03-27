using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.PostEntitys
{
    public class ReactionCommentary
    {
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Commentary")]
        public string CommentaryId { get; set; }
        public virtual PostCommentary Commentary { get; set; }
    }
}
