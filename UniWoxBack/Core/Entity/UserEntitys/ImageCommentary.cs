using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.UserEntitys
{
    public class ImageCommentary : BaseCommentary
    {
        /* Which image to attach it to */
        [ForeignKey("UserImages")]
        public string ImageId { get; set; }
        public virtual UserImages Images { get; set; }

        /* All Answers to Comments */
        public virtual ICollection<ImageAnswer> ImageAnswers { get; set; }
    }
}
