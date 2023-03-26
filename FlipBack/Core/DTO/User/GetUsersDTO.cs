namespace Core.DTO.User
{
    public class GetUsersDTO
    {
        public string Id { get; set; }
        public string UserImage { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public bool IsVerified { get; set; }
    }
}
