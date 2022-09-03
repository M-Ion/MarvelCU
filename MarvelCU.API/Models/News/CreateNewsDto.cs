using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.API.Models.News
{
    public class CreateNewsDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public StringBuilder Content { get; set; }
    }
}
