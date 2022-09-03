namespace MarvelCU.Domain;

public class Actor
{
    public int Id { get; init; }

    public string FullName { get; init; }

    public List<Movie> Movies { get; set; }
}

