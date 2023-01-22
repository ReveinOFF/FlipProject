using Core.Entity.PostEntitys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entity.ReelsEntity
{
    public class Reels : BasePR
    {
        /* Added files */
        public virtual ICollection<ReelsFiles> Files { get; set; }

        /* All users who saved their reels */
        public virtual ICollection<UserReels> Saveds { get; set; }

        /* All user reactions (like) */
        public virtual ICollection<ReelsReaction> Reactions { get; set; }

        /* All user comments */
        public virtual ICollection<ReelsCommentary> Commentary { get; set; }
    }
}
