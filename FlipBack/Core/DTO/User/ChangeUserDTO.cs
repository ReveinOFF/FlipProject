namespace Core.DTO.User
{
    public class ChangeUserDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Description { get; set; }
        public string NumberPhone { get; set; }
    }
}
