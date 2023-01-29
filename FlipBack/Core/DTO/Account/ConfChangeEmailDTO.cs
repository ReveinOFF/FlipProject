namespace Core.DTO.Account
{
    public class ConfChangeEmailDTO
    {
        public string NewEmail { get; set; }
        public string OldEmail { get; set; }
        public string Token { get; set; }
    }
}
