using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entity.UserEntitys;

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
