namespace Core.DTO.User
{
    public class GetUserDTO
    {
        public string Id { get; set; }
        public string UserImage { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public bool IsVerified { get; set; }
        public bool IsPrivateUser { get; set; }

        public int Followers { get; set; }
        public int Followings { get; set; }

        public ICollection<GetCreatedPostDTO> CreatedPost { get; set; }
        public ICollection<GetCreatedReelsDTO> CreatedReels { get; set; }
    }
}
