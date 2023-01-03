namespace Core.DTO.Account
{
    public class ConfirmPasswordDTO
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
        public string Token { get; set; }
    }
}
