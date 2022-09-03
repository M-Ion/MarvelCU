using System.Text;

namespace MarvelCU.API.Models.News
{
    public class UpdateNewsDto
    {
        public string Title { get; set; }
        public StringBuilder Content { get; set; }
    }
}
