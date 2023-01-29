using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.PostEntitys
{
    public class PostAnswer : BaseAnswer
    {
        /* Which comment to attach it to */
        [ForeignKey("PostCommentary")]
        public string CommentaryId { get; set; }
        public virtual PostCommentary Commentary { get; set; }
    }
}
