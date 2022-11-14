using Core.Entity.PostEntitys;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
