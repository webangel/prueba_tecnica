using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SB.Government.Api.Controllers
{
    public static  class JwtTokenGenerator
    {
        public static string GenerateToken(string issuer, string audience, string secret, int expirationDays = 7)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Name, "TestUser"), // Usuario ficticio
                new Claim(ClaimTypes.Role, "Admin"), // Rol ficticio
            }),
                Expires = DateTime.UtcNow.AddDays(expirationDays), // Expiración en una semana
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
