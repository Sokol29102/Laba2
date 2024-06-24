using System.ComponentModel.DataAnnotations;
using WebApplication1.Models;

public class Publisher
{
    public int PublisherID { get; set; }

    [Required]
    public string PublisherName { get; set; }

    [Required]
    public int UserID { get; set; }

    public User? User { get; set; }

}
