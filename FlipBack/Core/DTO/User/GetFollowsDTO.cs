namespace Core.DTO.User
{
    public class GetFollowsDTO
    {
        public string Id { get; set; }
        public string UserImage { get; set; }
        public string Name { get; set; }
        public bool IsVerified { get; set; }
        public bool IsFollowed { get; set; }
    }
}
