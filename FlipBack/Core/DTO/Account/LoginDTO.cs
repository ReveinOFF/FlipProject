namespace Core.DTO.Account
{
    public class LoginDTO
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string RecaptchaToken { get; set; }
    }
}
