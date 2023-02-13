namespace Core.Entity.PostEntitys
{
    public class Post : BasePR
    {
        /* Added files */
        public virtual ICollection<PostFiles> Files { get; set; }

        /* All users who saved their post */
        public virtual ICollection<UserPost> Saveds { get; set; }

        /* All user reactions (like) */
        public virtual ICollection<PostReaction> Reactions { get; set; }

        /* All user comments */
        public virtual ICollection<PostCommentary> Commentary { get; set; }
    }
}
