namespace Core.DTO.Account
{
    public class ChangeUserDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Description { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public bool IsPrivateUser { get; set; }
    }
}
