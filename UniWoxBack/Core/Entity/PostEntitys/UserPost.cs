using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entity.UserEntitys;

namespace Core.Entity.PostEntitys
{
    /* Saved posts by users */
    public class UserPost
    {
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Post")]
        public string PostId { get; set; }
        public virtual Post Post { get; set; }
    }
}
