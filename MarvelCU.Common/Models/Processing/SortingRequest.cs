namespace MarvelCU.Common.Models.Processing;

public class SortingRequest
{
    public string Prop { get; set; }

    public SortDirection Direction { get; set; } = SortDirection.Asc;
}

