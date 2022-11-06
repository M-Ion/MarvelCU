namespace MarvelCU.Common.Models.Processing;

public class SortingRequest
{
    public string Sort { get; set; }

    public SortDirection Direction { get; set; } = SortDirection.Asc;
}

