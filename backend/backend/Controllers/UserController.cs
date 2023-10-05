using backend.DataAccess;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using backend.Models;
using backend.Utils;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private DbAccess dbAccess;
        private readonly IConfiguration _config;
        
        public UserController(IConfiguration config)
        {
            _config = config;
            dbAccess = new DbAccess(config);
        }
        

        [HttpPost]
        public async Task<IActionResult> Post(User user)
        {
            string Password = HashPassword(user.Password);
            Guid Guid = Guid.NewGuid();
            int rowsAffected = await dbAccess.SaveData("RegisterUser", new { user.UserName, user.Email, Password, Guid });
            

            if(rowsAffected == -1)
            {
                return BadRequest("Username or Email is already in use");
            }
            var body = $"Click <a href=\"https://127.0.0.1:3000/verify/{Guid}\">here</a> to verify your account!";
            EmailSender.Send("jacob.lindgren@live.com", "Verify your account!", body);

            return Ok();
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            string SQLGet = "SELECT * FROM Users WHERE Email = @Email;";

            User user = await dbAccess.LoadDataSingle<User, dynamic>(SQLGet, new { Email = email });

            if(user == null)
            {
                return BadRequest("Login failed, either the email does not exist or the password does not match.");
            }

            string sql = "SELECT IsVerified FROM Users WHERE Email = @Email;";
            bool verified = await dbAccess.LoadDataSingle<bool, dynamic>(sql, new { Email = email });
            
            if(!verified)
            {
                return BadRequest("Your account is not verified. Please verify your account through the email we sent you.");
            }
     
            if (ValidatePassword(password, user.Password))
            {
                //Return Token
                Token token = new Token(_config);
                string tokenString = token.CreateToken(user.Id, "user", user.UserName);
                return Ok(tokenString);
            }
            return NotFound();
        }

        [HttpPost("ResetPassword")]
        public async Task ResetPassword(string Email)
        {
            string newPassword = GenerateRandomPassword(10);
            await dbAccess.SaveData<dynamic>("ResetPassword", new { Email, newPassword });
            var body = $"Your temporary password is {newPassword}\n Click here <a href=\"https://127.0.0.1:3000/resetPassword\">here</a> to reset your password.";
            EmailSender.Send("jacob.lindgren@live.com", "Reset password", body);
        }


        [HttpPut("UpdatePassword")]
        public async Task<IActionResult> UpdatePassword(string email, string oldPassword, string newPassword)
        {
            string sqlCheckPassword = "SELECT COUNT(Id) FROM Users WHERE Email = @Email AND Password = @OldPassword;";

            int count = await dbAccess.LoadDataSingle<int, dynamic>(sqlCheckPassword, new { email, oldPassword });

            if(count <= 0)
            {
                return BadRequest();
            }

            string resetPassword = HashPassword(newPassword);
            int rowsAffected = await dbAccess.SaveData<dynamic>("ResetPassword", new { email, NewPassword = resetPassword });

            if(rowsAffected <= 0)
            {
                return BadRequest();
            }

            return Ok("The password has been updated");
        }


        [HttpPost("Verify")]
        public async Task<IActionResult> Verify(Guid Guid)
        {
    
            int res = await dbAccess.SaveData("VerifyUser", new {  Guid });

            if(res <= 0)
            {
                return BadRequest("Error verifying account");
            }
            
            return Ok("Success");
        }

        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
        }

        private static bool ValidatePassword(string pwd, string pwdHash)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(pwd, pwdHash);
        }

        private string GenerateRandomPassword(int length)
        {
            string LowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
            string UppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string NumericCharacters = "0123456789";
            string SpecialCharacters = "!@#$%&*";

            string allCharacters = LowercaseCharacters + UppercaseCharacters + NumericCharacters + SpecialCharacters;
            Random random = new Random();
            StringBuilder password = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                int randomIndex = random.Next(0, allCharacters.Length);
                password.Append(allCharacters[randomIndex]);
            }

            return password.ToString();
        }
    }
}
