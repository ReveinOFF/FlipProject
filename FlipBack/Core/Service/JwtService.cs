using Core.DTO.Account;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Core.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Core.Service
{
    public class JwtService : IJwtService
    {
        private readonly IOptions<JwtOptions> _jwtOptions;
        private readonly UserManager<User> _userManager;

        public JwtService(UserManager<User> userManager, IOptions<JwtOptions> jwtOptions)
        {
            _userManager = userManager;
            _jwtOptions = jwtOptions;
        }

        public string CreateToken(User user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;

            List<Claim> claims = new List<Claim>()
            {
                new Claim("UserId", user.Id),
                new Claim("UserName", user.UserName)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim("Role", role));
            }

            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Value.Key));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.UtcNow.AddDays(_jwtOptions.Value.LifeTime),
                issuer: _jwtOptions.Value.Issuer,
                claims: claims
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public async Task<TokenDataDTO> RefreshTokens(string refreshToken)
        {
            var userRefreshToken = await _userManager.Users.Include((x) => x.RefreshTokens).Where(x => x.RefreshTokens.Any(t => t.Token == refreshToken)).FirstOrDefaultAsync();

            if (userRefreshToken == null)
            {
                return null;
            }

            var refToken = userRefreshToken.RefreshTokens.Where(x => x.Token == refreshToken).FirstOrDefault();

            if (DateTime.UtcNow > refToken.Expires)
                return null;

            var newJwtToken = CreateToken(userRefreshToken);
            var newRefreshToken = GenerateRefreshToken();

            newRefreshToken.UserId = userRefreshToken.Id;

            return new TokenDataDTO
            {
                TokensData = newRefreshToken,
                Token = newJwtToken,
                RefreshToken = newRefreshToken.Token
            };
        }

        public RefreshToken GenerateRefreshToken()
        {
            var refToken = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(refToken);

                return new RefreshToken 
                { 
                    Token = Convert.ToBase64String(refToken),
                    Expires = DateTime.UtcNow.AddDays(30)
                };
            }
        }
    }
}
