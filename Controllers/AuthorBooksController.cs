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

		[HttpGet("{authorID}/{bookID}")]
		public async Task<ActionResult<AuthorBook>> GetAuthorBook(int authorID, int bookID)
		{
			var authorBook = await _context.AuthorBooks.FindAsync(authorID, bookID);

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

			return CreatedAtAction(nameof(GetAuthorBook), new { authorID = authorBook.AuthorID, bookID = authorBook.BookID }, authorBook);
		}

		[HttpPut("{authorID}/{bookID}")]
		public async Task<IActionResult> PutAuthorBook(int authorID, int bookID, AuthorBook authorBook)
		{
			if (authorID != authorBook.AuthorID || bookID != authorBook.BookID)
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
				if (!AuthorBookExists(authorID, bookID))
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

		[HttpDelete("{authorID}/{bookID}")]
		public async Task<IActionResult> DeleteAuthorBook(int authorID, int bookID)
		{
			var authorBook = await _context.AuthorBooks.FindAsync(authorID, bookID);
			if (authorBook == null)
			{
				return NotFound();
			}

			_context.AuthorBooks.Remove(authorBook);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool AuthorBookExists(int authorID, int bookID)
		{
			return _context.AuthorBooks.Any(e => e.AuthorID == authorID && e.BookID == bookID);
		}
	}
}
