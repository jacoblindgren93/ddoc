using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Utils
{
    public class Token
    {
        private readonly IConfiguration _config;

        public Token(IConfiguration config)
        {
            _config = config;
        }

        public string CreateToken(int userId, string role, string username)
        {
            Claim[] claims = new Claim[]{
                new Claim(ClaimTypes.Role, role),
                new Claim("userId", userId.ToString()),
                new Claim("username", username)
            };
            string? tokenKeyString = _config.GetSection("TokenKey").Value;
            SymmetricSecurityKey tokenKey = new(
                    Encoding.UTF8.GetBytes(
                        tokenKeyString ?? ""
                    )
            );

            SigningCredentials signingCredentials = new SigningCredentials(
                tokenKey,
                SecurityAlgorithms.HmacSha512Signature
            );

            SecurityTokenDescriptor securityTokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = signingCredentials,
                Expires = DateTime.Now.AddDays(1000),
            };

            JwtSecurityTokenHandler tokenHandler = new();

            SecurityToken token = tokenHandler.CreateToken(securityTokenDescriptor);

            return tokenHandler.WriteToken(token);

        }

        public bool validateJWT(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = GetValidationParameters();

            SecurityToken validatedToken;
            try
            {
                IPrincipal principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
                return true;
            }
            catch (Exception)
            {
                return false;
            };
        }


        private TokenValidationParameters GetValidationParameters()
        {
            string? tokenKeyString = _config.GetSection("AppSettings:TokenKey").Value;
            return new TokenValidationParameters()
            {
                ValidateLifetime = true, // Because there is no expiration in the generated token
                ValidateAudience = false, // Because there is no audiance in the generated token
                ValidateIssuer = false,   // Because there is no issuer in the generated token
                ValidIssuer = "Sample",
                ValidAudience = "Sample",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKeyString != null ? tokenKeyString : "")) // The same key as the one that generate the token
            };
        }
    }
}
