using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.Common.Dtos.News;

public class CreateNewsDto
{
    [Required]
    public string Title { get; set; }

    [Required]
    public StringBuilder Content { get; set; }
}

