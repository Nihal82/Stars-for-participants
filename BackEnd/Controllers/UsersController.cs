using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using log4net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using miniproject.Models;

namespace miniproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly ILog log;

        public UsersController(DatabaseContext context)
        {
            _context = context;
            log = LogManager.GetLogger(typeof(UsersController));
        }

        // GET: api/Users
        [HttpGet("api/{name}")]
        public  ActionResult<String> GetName(string email)
        {
            User user = _context.Users.FirstOrDefault(x => x.email == email);
            string name = user.firstName + " " + user.lastName;
            return name;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }
        //api/skill
        [HttpGet("api/skill")]
        public async Task<ActionResult<IEnumerable<string>>> GetSkill(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            User user = await _context.Users.FindAsync(id);
            string skill = user.skills;
            var skills = skill.Split(',');
            return skills;

        }
        [HttpGet("api/emailId")]
        public async Task<ActionResult<IEnumerable<string>>> GetEmail()
        {

            List<User> userlist= await _context.Users.ToListAsync();
            List<String> emaillist = new List<String>();
            foreach(User user in userlist)
            {
                emaillist.Add(user.email);
            }
            return emaillist;

        }
        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                log.Info("Save changes sync complete");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
          if (_context.Users == null)
          {
              return Problem("Entity set 'DatabaseContext.Users'  is null.");
          }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        public static DatabaseContext GetDatabaseContext()
        {
            var option = new DbContextOptionsBuilder<DatabaseContext>()
            .UseSqlServer(@"server=LTIN266999\\MSSQL2019;database=miniproject;trusted_connection=true")
            .Options;
            var dbContext = new DatabaseContext(option);
            return dbContext;
        }





    }



}
