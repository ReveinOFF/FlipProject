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
    public class PostCommentary : BaseCommentary
    {   
        /* Which post to attach it to */
        [ForeignKey("Post")]
        public string PostId { get; set; }
        public virtual Post Post { get; set; }

        /* All Answers to Comments */
        public virtual ICollection<PostAnswer> PostAnswers { get; set; }
    }
}
