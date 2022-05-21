using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using miniproject.Models;

namespace miniproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignedTablesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public AssignedTablesController(DatabaseContext context)
        {
            _context = context;
        }

     
        [HttpGet("api/{request}")]
        public  ActionResult<IEnumerable<AssignedTable>> GetAssignedTable(string email, string role)
        {
            if (role == "Trainer")
            {
                List<AssignedTable> user = _context.assignedTable.Where(x => x.temail == email).ToList();
                return user;
            }
            else
            {
                List<AssignedTable> user = _context.assignedTable.Where(x => x.semail == email).ToList();
                return user;
            }

           
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssignedTable>>> GetassignedTable()
        {
          if (_context.assignedTable == null)
          {
              return NotFound();
          }
            return await _context.assignedTable.ToListAsync();
        }

        // GET: api/AssignedTables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AssignedTable>> GetAssignedTable(int id)
        {
          if (_context.assignedTable == null)
          {
              return NotFound();
          }
            var assignedTable = await _context.assignedTable.FindAsync(id);

            if (assignedTable == null)
            {
                return NotFound();
            }

            return assignedTable;
        }

        // PUT: api/AssignedTables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssignedTable(int id, AssignedTable assignedTable)
        {
            if (id != assignedTable.Id)
            {
                return BadRequest();
            }

            _context.Entry(assignedTable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignedTableExists(id))
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

        // POST: api/AssignedTables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AssignedTable>> PostAssignedTable(AssignedTable assignedTable)
        {
          if (_context.assignedTable == null)
          {
              return Problem("Entity set 'DatabaseContext.assignedTable'  is null.");
          }
            _context.assignedTable.Add(assignedTable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssignedTable", new { id = assignedTable.Id }, assignedTable);
        }

        // DELETE: api/AssignedTables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssignedTable(int id)
        {
            if (_context.assignedTable == null)
            {
                return NotFound();
            }
            var assignedTable = await _context.assignedTable.FindAsync(id);
            if (assignedTable == null)
            {
                return NotFound();
            }

            _context.assignedTable.Remove(assignedTable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AssignedTableExists(int id)
        {
            return (_context.assignedTable?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
