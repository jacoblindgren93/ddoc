using backend.DataAccess;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using backend.Models;
using backend.Utils;

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

            EmailSender.Send(user.Email, "Verify your account!", "Heres the link bro: " + Guid);
            return Ok();
        }

        [HttpPost("Login")]
        public IActionResult Login(string email, string password)
        {
            string SQLGet = "SELECT * FROM Users WHERE Email = @Email;";

            User user = dbAccess.LoadDataSingle<User, dynamic>(SQLGet, new { Email = email });

            if(user == null)
            {
                return BadRequest();
            }

            string sql = "SELECT IsVerified FROM Users WHERE Email = @Email;";
            bool verified = dbAccess.LoadDataSingle<bool, dynamic>(sql, new { Email = email });
            
            if(!verified)
            {
                return BadRequest("Your account is not verified. Please verify your account through the email we sent you.");
            }
            
            if(ValidatePassword(password, user.Password))
            {
                //Return Token
                return Ok("Successful login");
            }
            return NotFound();
        }

        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
        }

        private static bool ValidatePassword(string pwd, string pwdHash)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(pwd, pwdHash);
        }
    }
}
