using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Book
    {
        public int BookID { get; set; }
        public string Description { get; set; }
        public int Score { get; set; }
        public int PublishDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<AuthorBook>? AuthorBooks { get; set; }
    }
}
