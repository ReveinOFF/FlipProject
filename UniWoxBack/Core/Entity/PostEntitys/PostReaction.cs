using System.ComponentModel.DataAnnotations.Schema;
using Core.Entity.UserEntitys;

namespace Core.Entity.PostEntitys
{
    /* Users Reacted Posts */
    public class PostReaction
    {
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Post")]
        public string PostId { get; set; }
        public virtual Post Post { get; set; }

        public bool IsLike { get; set; }
    }
}
