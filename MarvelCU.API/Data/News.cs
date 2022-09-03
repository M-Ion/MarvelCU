using System.Text;

namespace MarvelCU.API.Data
{
    public class News
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Posted { get; init; }
        public StringBuilder Content { get; set; }
    }
}
