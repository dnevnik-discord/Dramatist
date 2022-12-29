using Microsoft.EntityFrameworkCore;

class UserDb : DbContext
{
    public UserDb(DbContextOptions options) : base(options) { }
    public DbSet<User> Users { get; set; } = null!;
}

