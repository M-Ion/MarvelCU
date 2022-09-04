namespace MarvelCU.Domain;

public class Actor
{
    public int Id { get; set; }

    public string FullName { get; set; }

    public List<Movie> Movies { get; set; }
}

