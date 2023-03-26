using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entity.ReelsEntity
{
    public class Reels : BasePR
    {
        /* Added file */
        [ForeignKey("ReelsFiles")]
        public string FileId { get; set; }
        public virtual ReelsFiles File { get; set; }

        /* All users who saved their reels */
        public virtual ICollection<UserReels> Saveds { get; set; }

        /* All user reactions (like) */
        public virtual ICollection<ReelsReaction> Reactions { get; set; }

        /* All user comments */
        public virtual ICollection<ReelsCommentary> Commentary { get; set; }
    }
}
