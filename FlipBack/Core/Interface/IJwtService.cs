using Core.DTO.Account;
using Core.Entity.UserEntitys;
using System.Security.Claims;

namespace Core.Interface
{
    public interface IJwtService
    {
        string CreateToken(User user);
        Task<TokenDataDTO> RefreshTokens(string refreshToken);
        RefreshToken GenerateRefreshToken();
    }
}
