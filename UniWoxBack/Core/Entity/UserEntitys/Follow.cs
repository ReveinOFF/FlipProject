namespace Core.Entity.UserEntitys
{
    public class Follow
    {
        public string FollowerId { get; set; }
        public virtual User Follower { get; set; }

        public string FollowingId { get; set; }
        public virtual User Following { get; set; }
    }
}
