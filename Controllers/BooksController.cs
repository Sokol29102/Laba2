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
    public class BooksController : ControllerBase
    {
        private readonly BookStoreContext _context;

        public BooksController(BookStoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                await _context.Database.ExecuteSqlRawAsync("DISABLE TRIGGER ALL ON Books");

                book.CreatedAt = DateTime.UtcNow;
                book.UpdatedAt = DateTime.UtcNow;

                _context.Books.Add(book);
                await _context.SaveChangesAsync();

                await _context.Database.ExecuteSqlRawAsync("ENABLE TRIGGER ALL ON Books");
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

            return CreatedAtAction(nameof(GetBook), new { id = book.BookID }, book);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.BookID)
            {
                return BadRequest();
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                await _context.Database.ExecuteSqlRawAsync("DISABLE TRIGGER ALL ON Books");

                var existingBook = await _context.Books.FindAsync(id);
                if (existingBook == null)
                {
                    await _context.Database.ExecuteSqlRawAsync("ENABLE TRIGGER ALL ON Books");
                    return NotFound();
                }

                existingBook.Description = book.Description;
                existingBook.PublishDate = book.PublishDate;
                existingBook.Score = book.Score;
                existingBook.UpdatedAt = DateTime.UtcNow;

                _context.Entry(existingBook).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                await _context.Database.ExecuteSqlRawAsync("ENABLE TRIGGER ALL ON Books");
                await transaction.CommitAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                await transaction.RollbackAsync();
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                await _context.Database.ExecuteSqlRawAsync("DISABLE TRIGGER ALL ON Books");

                var book = await _context.Books.FindAsync(id);
                if (book == null)
                {
                    await _context.Database.ExecuteSqlRawAsync("ENABLE TRIGGER ALL ON Books");
                    return NotFound();
                }

                _context.Books.Remove(book);
                await _context.SaveChangesAsync();

                await _context.Database.ExecuteSqlRawAsync("ENABLE TRIGGER ALL ON Books");
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.BookID == id);
        }
    }
}
