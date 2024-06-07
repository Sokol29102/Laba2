using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class UsersController : ControllerBase
	{
		private readonly BookStoreContext _context;

		public UsersController(BookStoreContext context)
		{
			_context = context;
		}

		// GET: /Users
		[HttpGet]
		public IActionResult GetUsers()
		{
			var users = _context.Users.ToList();
			return Ok(users);
		}

		// GET: /Users/5
		[HttpGet("{id}")]
		public IActionResult GetUser(int id)
		{
			var user = _context.Users.Find(id);
			if (user == null)
			{
				return NotFound();
			}
			return Ok(user);
		}

		// POST: /Users
		[HttpPost]
		public IActionResult CreateUser([FromBody] User user)
		{
			_context.Users.Add(user);
			_context.SaveChanges();
			return CreatedAtAction(nameof(GetUser), new { id = user.UserID }, user);
		}

		// PUT: /Users/5
		[HttpPut("{id}")]
		public IActionResult UpdateUser(int id, [FromBody] User user)
		{
			if (id != user.UserID)
			{
				return BadRequest();
			}

			_context.Entry(user).State = EntityState.Modified;
			_context.SaveChanges();
			return NoContent();
		}

		// DELETE: /Users/5
		[HttpDelete("{id}")]
		public IActionResult DeleteUser(int id)
		{
			var user = _context.Users.Find(id);
			if (user == null)
			{
				return NotFound();
			}

			_context.Users.Remove(user);
			_context.SaveChanges();
			return NoContent();
		}
	}
}
