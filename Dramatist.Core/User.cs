using System.ComponentModel.DataAnnotations;


public class User
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Handle { get; set; }

    [Required]
    public string Name { get; set; }

    // Navigation property
    public virtual ICollection<Comment> Comments { get; set; }

    public bool? IsDemocrat { get; set; }

    public bool? IsGerbage { get; set; }

    public bool? IsPutaran { get; set; }

    public string? Notes { get; set; }
}
