using Core.Entity.PostEntitys;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.ReelsEntity
{
    public class ReelsAnswer : BaseAnswer
    {
        /* Which comment to attach it to */
        [ForeignKey("ReelsCommentary")]
        public string CommentaryId { get; set; }
        public virtual ReelsCommentary Commentary { get; set; }
    }
}
