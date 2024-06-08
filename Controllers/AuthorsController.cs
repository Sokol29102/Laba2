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

			_context.Entry(author).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!AuthorExists(id))
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
