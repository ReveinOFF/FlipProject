using Core.Entity.UserEntitys;

namespace Core.DTO.Account
{
    public class TokenDataDTO
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public RefreshToken TokensData { get; set; }
    }
}
