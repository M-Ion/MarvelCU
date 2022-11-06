using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.Domain;

public class News : BaseEntity
{
    [Required]
    [MaxLength(150)]
    public string Title { get; set; }

    [Required]
    public DateTime Posted { get; set; }

    public DateTime Updated { get; set; }

    [Required]
    [MaxLength(2500)]
    public string Content { get; set; }

    public byte[] RowVersion { get; set; }
}

