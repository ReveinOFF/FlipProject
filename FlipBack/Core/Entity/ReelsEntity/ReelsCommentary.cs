using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.ReelsEntity
{
    public class ReelsCommentary : BaseCommentary
    {
        /* Which post to attach it to */
        [ForeignKey("Reels")]
        public string ReelsId { get; set; }
        public virtual Reels Reels { get; set; }

        /* All Answers to Comments */
        public virtual ICollection<ReelsAnswer> ReelsAnswers { get; set; }
    }
}
