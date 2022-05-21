using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using miniproject.Models;
using Microsoft.AspNetCore.Authorization;

namespace miniproject.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly DatabaseContext _context;

        public TokenController(IConfiguration config, DatabaseContext context)
        {
            _configuration = config;
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> Post(User _userData)
        {

            if (_userData.email != null && _userData.pass != null)
            {
                var user = await GetUser(_userData.email, _userData.pass);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Id", user.Id.ToString()),
                    new Claim("firstName", user.firstName),
                    new Claim("lastName", user.lastName),
                    new Claim("userType", user.usertype),
                    new Claim("email", user.email)
                   };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);
                    string[] arr = { new JwtSecurityTokenHandler().WriteToken(token), user.Id.ToString(), user.email, user.firstName + " " + user.lastName,user.usertype, user.email };
                    return Ok(arr);
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        private async Task<User> GetUser(string email, string password)
        {
            Console.WriteLine(email);
            Console.WriteLine(password);
            return await _context.Users.FirstOrDefaultAsync(u => u.email == email && u.pass == password);
        }





    }
}
