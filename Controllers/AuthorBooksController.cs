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
    public class AuthorBooksController : ControllerBase
    {
        private readonly BookStoreContext _context;

        public AuthorBooksController(BookStoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuthorBook>>> GetAuthorBooks()
        {
            return await _context.AuthorBooks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuthorBook>> GetAuthorBook(int id)
        {
            var authorBook = await _context.AuthorBooks.FindAsync(id);

            if (authorBook == null)
            {
                return NotFound();
            }

            return authorBook;
        }

        [HttpPost]
        public async Task<ActionResult<AuthorBook>> PostAuthorBook(AuthorBook authorBook)
        {
            _context.AuthorBooks.Add(authorBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAuthorBook), new { id = authorBook.RID }, authorBook);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuthorBook(int id, AuthorBook authorBook)
        {
            if (id != authorBook.RID)
            {
                return BadRequest();
            }

            _context.Entry(authorBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorBookExists(id))
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
        public async Task<IActionResult> DeleteAuthorBook(int id)
        {
            var authorBook = await _context.AuthorBooks.FindAsync(id);
            if (authorBook == null)
            {
                return NotFound();
            }

            _context.AuthorBooks.Remove(authorBook);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AuthorBookExists(int id)
        {
            return _context.AuthorBooks.Any(e => e.RID == id);
        }
    }
}
