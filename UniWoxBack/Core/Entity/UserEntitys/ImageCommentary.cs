using Core.Entity.PostEntitys;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
