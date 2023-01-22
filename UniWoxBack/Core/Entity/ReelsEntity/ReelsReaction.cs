using Core.Entity.PostEntitys;
using Core.Entity.UserEntitys;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.ReelsEntity
{
    /* Users Reacted Reels */
    public class ReelsReaction
    {
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Reels")]
        public string ReelsId { get; set; }
        public virtual Reels Reels { get; set; }
    }
}
