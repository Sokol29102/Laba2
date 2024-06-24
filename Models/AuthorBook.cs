using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class AuthorBook
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RID { get; set; }

        [Required]
        public int AuthorID { get; set; }

        [ForeignKey("AuthorID")]
        public Author? Author { get; set; }

        [Required]
        public int BookID { get; set; }

        [ForeignKey("BookID")]
        public Book? Book { get; set; }
    }
}
