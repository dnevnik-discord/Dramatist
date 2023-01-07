using System.ComponentModel.DataAnnotations;


public class Comment
{
    [Required]
    public int Id { get; set; }

    [Required]
    public int ArticleId { get; set; }
    
    // Navigation properties
    public virtual Article Article { get; set; }

    [Required]
    public int UserId { get; set; }

    // Navigation properties
    public virtual User User { get; set; }

    [Required]
    public int Position { get; set; }

    [Required]
    public DateTime Published { get; set; }

    [Required]
    public string Text { get; set; }
}
