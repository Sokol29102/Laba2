using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublishersController : ControllerBase
    {
        private readonly BookStoreContext _context;

        public PublishersController(BookStoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PublisherDTO>>> GetPublishers()
        {
            return await _context.Publishers
                .Select(p => new PublisherDTO
                {
                    PublisherID = p.PublisherID,
                    PublisherName = p.PublisherName,
                    UserID = p.UserID
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PublisherDTO>> GetPublisher(int id)
        {
            var publisher = await _context.Publishers
                .Where(p => p.PublisherID == id)
                .Select(p => new PublisherDTO
                {
                    PublisherID = p.PublisherID,
                    PublisherName = p.PublisherName,
                    UserID = p.UserID
                })
                .FirstOrDefaultAsync();

            if (publisher == null)
            {
                return NotFound();
            }

            return publisher;
        }

        [HttpPost]
        public async Task<ActionResult<Publisher>> PostPublisher(Publisher publisher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(publisher.UserID);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            _context.Publishers.Add(publisher);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPublisher), new { id = publisher.PublisherID }, publisher);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPublisher(int id, Publisher publisher)
        {
            if (id != publisher.PublisherID)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(publisher.UserID);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var existingPublisher = await _context.Publishers.FindAsync(id);
            if (existingPublisher == null)
            {
                return NotFound();
            }

            existingPublisher.PublisherName = publisher.PublisherName;
            existingPublisher.UserID = publisher.UserID;

            _context.Entry(existingPublisher).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublisherExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublisher(int id)
        {
            var publisher = await _context.Publishers.FindAsync(id);
            if (publisher == null)
            {
                return NotFound();
            }

            _context.Publishers.Remove(publisher);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PublisherExists(int id)
        {
            return _context.Publishers.Any(e => e.PublisherID == id);
        }
    }
}
