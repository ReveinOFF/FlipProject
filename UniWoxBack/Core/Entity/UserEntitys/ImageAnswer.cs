using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.UserEntitys
{
    public class ImageAnswer : BaseAnswer
    {
        /* Which comment to attach it to */
        [ForeignKey("ImageCommentary")]
        public string CommentaryId { get; set; }
        public virtual ImageCommentary Commentary { get; set; }
    }
}
