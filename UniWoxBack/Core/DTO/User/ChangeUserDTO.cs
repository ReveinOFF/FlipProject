namespace Core.DTO.User
{
    public class ChangeUserDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Description { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public bool IsPrivateUser { get; set; }
    }
}
