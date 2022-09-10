using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.Domain;

public class News : BaseEntity
{
    [Required]
    public string Title { get; set; }

    [Required]
    public DateTime Posted { get; set; }

    public DateTime Updated { get; set; }

    public string Content { get; set; }
}

