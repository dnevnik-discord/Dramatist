using System.ComponentModel.DataAnnotations;


public class Article
{
    [Required]
    public int Id { get; set; }

    public Uri ShortUri { get; set; }

    public Uri FullUri { get; set; }

    // public List<Comment> Comments { get; set; }

    // Navigation property
    public virtual ICollection<Comment> Comments { get; set; }
}
