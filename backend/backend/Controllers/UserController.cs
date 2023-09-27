using backend.DataAccess;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using backend.Models;
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
            
            int rowsAffected = await dbAccess.SaveData("RegisterUser", new { user.UserName, user.Email, Password });

            if(rowsAffected == -1)
            {
                return BadRequest("Username or Email is already in use");
            }

            return Ok();
        }

        [HttpPost("Login")]
        public IActionResult Login(string username, string password)
        {
            string SQLGet = "SELECT * FROM Users WHERE Username = @Username;";

            User user = dbAccess.LoadDataSingle<User, dynamic>(SQLGet, new { Username = username });

            if(user == null)
            {
                return BadRequest();
            }

            if(ValidatePassword(password, user.Password))
            {
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
