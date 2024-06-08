using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data
{
	public class BookStoreContext : DbContext
	{
		public BookStoreContext(DbContextOptions<BookStoreContext> options)
			: base(options)
		{
		}

		public DbSet<Author> Authors { get; set; }
		public DbSet<Book> Books { get; set; }
		public DbSet<AuthorBook> AuthorBooks { get; set; }
		public DbSet<User> Users { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<AuthorBook>()
				.HasKey(ab => new { ab.AuthorID, ab.BookID });

			modelBuilder.Entity<AuthorBook>()
				.HasOne(ab => ab.Author)
				.WithMany(a => a.AuthorBooks)
				.HasForeignKey(ab => ab.AuthorID);

			modelBuilder.Entity<AuthorBook>()
				.HasOne(ab => ab.Book)
				.WithMany(b => b.AuthorBooks)
				.HasForeignKey(ab => ab.BookID);
		}
	}
}
