using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
	public class Author
	{
		public int AuthorID { get; set; }
		public int Born { get; set; }
		public int? Death { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }

		public ICollection<AuthorBook> AuthorBooks { get; set; }
	}
}
