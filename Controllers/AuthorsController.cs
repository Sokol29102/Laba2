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
            author.CreatedAt = DateTime.UtcNow;
            author.UpdatedAt = DateTime.UtcNow;

            _context.Authors.Add(author);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAuthor), new { id = author.AuthorID }, author);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuthor(int id, Author author)
        {
            if (id != author.AuthorID)
            {
                return BadRequest();
            }

            // Validate the author object
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Disable triggers
                await _context.Database.ExecuteSqlRawAsync("DISABLE TRIGGER ALL ON Authors");

                var existingAuthor = await _context.Authors.FindAsync(id);
                if (existingAuthor == null)
                {
                    await _context.Database.ExecuteSqlRawAsync("ENABLE TRIGGER ALL ON Authors");
                    return NotFound();
                }

                existingAuthor.Born = author.Born;
                existingAuthor.Death = author.Death;
                existingAuthor.PublisherID = author.PublisherID;
                existingAuthor.UpdatedAt = DateTime.UtcNow;

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
        [HttpGet("findByYear")]
        public async Task<ActionResult<IEnumerable<AuthorDTO>>> FindAuthorsByYear(int year, string condition)
        {
            if (condition != "after" && condition != "before")
            {
                return BadRequest("Invalid condition. Use 'after' or 'before'.");
            }

            IQueryable<AuthorDTO> query = from author in _context.Authors
                                          join authorBook in _context.AuthorBooks on author.AuthorID equals authorBook.AuthorID
                                          join book in _context.Books on authorBook.BookID equals book.BookID
                                          where (condition == "after" && book.PublishDate > year) || (condition == "before" && book.PublishDate < year)
                                          select new AuthorDTO
                                          {
                                              AuthorID = author.AuthorID,
                                              Born = author.Born,
                                              Death = author.Death
                                          };

            var authors = await query.ToListAsync();

            return authors;
        }
        /*[HttpGet("over90Years")]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthorsOver90Years()
        {
            var authors = await _context.Authors
                .Where(a => a.Death.HasValue && (a.Death.Value - a.Born) > 90)
                .ToListAsync();

            return authors;
        }*/

        private bool AuthorExists(int id)
        {
            return _context.Authors.Any(e => e.AuthorID == id);
        }
    }
}
