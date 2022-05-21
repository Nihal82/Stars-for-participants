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
    public class TrainerRaiseRequestsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TrainerRaiseRequestsController(DatabaseContext context)
        {
            _context = context;
        }
       
        




        // GET: api/TrainerRaiseRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrainerRaiseRequest>>> GetTrainerRaiseRequests()
        {
          if (_context.TrainerRaiseRequests == null)
          {
              return NotFound();
          }
            return await _context.TrainerRaiseRequests.ToListAsync();



        }
       

        [HttpGet("{requests}")]
        public ActionResult<IEnumerable<TrainerRaiseRequest>> GetTrainerRaiseRequests(string email)
        {
            if (_context.TrainingRequests == null)
            {
                return NotFound();
            }
            List<TrainerRaiseRequest> trainingRequest = _context.TrainerRaiseRequests.Where(x => x.temail == email).ToList();

            if (trainingRequest == null)
            {
                return NotFound();
            }

            return trainingRequest;
        }


        //[HttpGet("api/{fetch}")]
        //public ActionResult<int> GetIdByEmail(string email,string time)
        //{
        //    int id = _context.TrainerRaiseRequests.Find(x => x.temail == email && x=>x.)
        //}





        [HttpGet("api/{fetchtrainer}")]
        public ActionResult<IEnumerable<TrainerRaiseRequest>> GetMatchingTrainer(string skill)
        {
            List<TrainerRaiseRequest> trainers = _context.TrainerRaiseRequests.Where(x => x.skill == skill).ToList();
            if(trainers == null)
            {
                return NotFound();
            }
            return trainers;
        }



        // GET: api/TrainerRaiseRequests/5
       

        // PUT: api/TrainerRaiseRequests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrainerRaiseRequest(int id, TrainerRaiseRequest trainerRaiseRequest)
        {
            if (id != trainerRaiseRequest.Id)
            {
                return BadRequest();
            }

            _context.Entry(trainerRaiseRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainerRaiseRequestExists(id))
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

        // POST: api/TrainerRaiseRequests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TrainerRaiseRequest>> PostTrainerRaiseRequest(TrainerRaiseRequest trainerRaiseRequest)
        {
          if (_context.TrainerRaiseRequests == null)
          {
              return Problem("Entity set 'DatabaseContext.TrainerRaiseRequests'  is null.");
          }
            _context.TrainerRaiseRequests.Add(trainerRaiseRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrainerRaiseRequest", new { id = trainerRaiseRequest.Id }, trainerRaiseRequest);
        }

        // DELETE: api/TrainerRaiseRequests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainerRaiseRequest(int id)
        {
            if (_context.TrainerRaiseRequests == null)
            {
                return NotFound();
            }
            var trainerRaiseRequest = await _context.TrainerRaiseRequests.FindAsync(id);
            if (trainerRaiseRequest == null)
            {
                return NotFound();
            }

            _context.TrainerRaiseRequests.Remove(trainerRaiseRequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TrainerRaiseRequestExists(int id)
        {
            return (_context.TrainerRaiseRequests?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
