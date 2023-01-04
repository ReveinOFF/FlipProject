namespace Core.DTO.User
{
    public class GetUserDTO
    {
        public string Id { get; set; }
        public string UserImage { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Description { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public bool IsVerified { get; set; }
        public bool IsPrivateUser { get; set; }

        public int Followers { get; set; }
        public int Followings { get; set; }

        public ICollection<IEnumerable<string>> CreatedPost { get; set; }
    }
}
