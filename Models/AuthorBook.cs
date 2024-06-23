using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class AuthorBook
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RID { get; set; }

        public int AuthorID { get; set; }
        public Author? Author { get; set; }

        public int BookID { get; set; }
        public Book? Book { get; set; }
    }
}
