using System.ComponentModel.DataAnnotations.Schema;
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
