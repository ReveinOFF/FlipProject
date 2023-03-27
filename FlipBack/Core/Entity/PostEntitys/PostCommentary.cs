using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.PostEntitys
{
    public class PostCommentary : BaseCommentary
    {
        /* Which post to attach it to */
        [ForeignKey("Post")]
        public string PostId { get; set; }
        public virtual Post Post { get; set; }

        /* All Answers to Comments */
        public virtual ICollection<ReactionCommentary> ReactionCommentary { get; set; }
        public virtual ICollection<PostAnswer> PostAnswers { get; set; }
    }
}
