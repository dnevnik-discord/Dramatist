using Microsoft.EntityFrameworkCore;


public class DnevnikDb : DbContext
{
    public DnevnikDb(DbContextOptions options) : base(options) { }

    public DbSet<User> Users { get; set; } = null!;

    public DbSet<Comment> Comments { get; set; } = null!;

    public DbSet<Article> Articles { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasAlternateKey(u => u.Handle );

        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Article)
            .WithMany(a => a.Comments)
            .HasForeignKey(c => c.ArticleId);

        modelBuilder.Entity<Comment>()
            .HasOne(c => c.User)
            .WithMany(u => u.Comments)
            .HasForeignKey(c => c.UserId);

        // modelBuilder.Entity<Article>();
    }
}
