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
    public class TrainingRequestsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TrainingRequestsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/TrainingRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrainingRequest>>> GetTrainingRequests()
        {
          if (_context.TrainingRequests == null)
          {
              return NotFound();
          }
            return await _context.TrainingRequests.ToListAsync();
        }
       
        [HttpGet("{requests}")]
        public  ActionResult<IEnumerable<TrainingRequest>> GetTrainingRequest(string email)
        {
          if (_context.TrainingRequests == null)
          {
              return NotFound();
          }
            List<TrainingRequest> trainingRequest =  _context.TrainingRequests.Where(x => x.semail == email).ToList();

            if (trainingRequest == null)
            {
                return NotFound();
            }

            return  trainingRequest;
        }

        // PUT: api/TrainingRequests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrainingRequest(int id, TrainingRequest trainingRequest)
        {
            if (id != trainingRequest.Id)
            {
                return BadRequest();
            }

            _context.Entry(trainingRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainingRequestExists(id))
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

        // POST: api/TrainingRequests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TrainingRequest>> PostTrainingRequest(TrainingRequest trainingRequest)
        {
          if (_context.TrainingRequests == null)
          {
              return Problem("Entity set 'DatabaseContext.TrainingRequests'  is null.");
          }
            _context.TrainingRequests.Add(trainingRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrainingRequest", new { id = trainingRequest.Id }, trainingRequest);
        }

        // DELETE: api/TrainingRequests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainingRequest(int id)
        {
            if (_context.TrainingRequests == null)
            {
                return NotFound();
            }
            var trainingRequest = await _context.TrainingRequests.FindAsync(id);
            if (trainingRequest == null)
            {
                return NotFound();
            }

            _context.TrainingRequests.Remove(trainingRequest);
            await _context.SaveChangesAsync();

            return Content("Deletion Sucessful ");
        }

        private bool TrainingRequestExists(int id)
        {
            return (_context.TrainingRequests?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
