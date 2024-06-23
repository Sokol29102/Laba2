using System;

namespace WebApplication1.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
