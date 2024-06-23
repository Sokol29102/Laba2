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
    public class AuthorsController : ControllerBase
    {
        private readonly BookStoreContext _context;

        public AuthorsController(BookStoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthors()
        {
            return await _context.Authors.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthor(int id)
        {
            var author = await _context.Authors.FindAsync(id);

            if (author == null)
            {
                return NotFound();
            }

            return author;
        }

        [HttpPost]
        public async Task<ActionResult<Author>> PostAuthor(Author author)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            author.CreatedAt = DateTime.UtcNow;
            author.UpdatedAt = DateTime.UtcNow;

            _context.Authors.Add(author);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

            return CreatedAtAction(nameof(GetAuthor), new { id = author.AuthorID }, author);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuthor(int id, Author author)
        {
            if (id != author.AuthorID)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                await _context.Database.ExecuteSqlRawAsync("DISABLE TRIGGER ALL ON Authors");

                var existingAuthor = await _context.Authors.FindAsync(id);
                if (existingAuthor == null)
                {
                    await _context.Database.ExecuteSqlRawAsync("ENABLE TRIGGER ALL ON Authors");
                    return NotFound();
                }

                existingAuthor.Born = author.Born;
                existingAuthor.Death = author.Death;
                existingAuthor.UpdatedAt = DateTime.UtcNow;
                existingAuthor.PublisherID = author.PublisherID;

                _context.Entry(existingAuthor).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                await _context.Database.ExecuteSqlRawAsync("ENABLE TRIGGER ALL ON Authors");

                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            var author = await _context.Authors.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }

            _context.Authors.Remove(author);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AuthorExists(int id)
        {
            return _context.Authors.Any(e => e.AuthorID == id);
        }
    }
}
