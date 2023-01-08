using Core.DTO.Account;
using Core.Entity.UserEntitys;
using Core.Helpers;
using Core.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim("Role", role));
            }

            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Value.Key));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                issuer: _jwtOptions.Value.Issuer,
                claims: claims
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public async Task<TokenDTO> RenewTokens(string refreshToken)
        {
            var userRefreshToken = _userManager.Users.Where(x => x.RefreshToken == refreshToken).FirstOrDefault();

            if (userRefreshToken == null)
            {
                return null;
            }

            var newJwtToken = CreateToken(userRefreshToken);
            var newRefreshToken = GenerateRefreshToken();

            userRefreshToken.RefreshToken = newRefreshToken;
            await _userManager.UpdateAsync(userRefreshToken);

            return new TokenDTO
            {
                Token = newJwtToken,
                RefreshToken = newRefreshToken
            };
        }


        public string GenerateRefreshToken()
        {
            var refToken = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(refToken);

                return Convert.ToBase64String(refToken);
            }
        }
    }
}
