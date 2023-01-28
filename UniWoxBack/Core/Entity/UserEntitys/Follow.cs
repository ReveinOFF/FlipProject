namespace Core.Entity.UserEntitys
{
    public class Follow
    {
        public string FollowerUserId { get; set; }
        public virtual User FollowerUser { get; set; }

        public string FollowingUserId { get; set; }
        public virtual User FollowingUser { get; set; }
    }
}
