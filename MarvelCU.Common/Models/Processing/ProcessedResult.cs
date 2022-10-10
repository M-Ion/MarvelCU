namespace MarvelCU.Common.Models.Processing;

public class ProcessedResult<T> where T : class
{
    public int? PageIndex { get; set; }

    public int? PageSize { get; set; }

    public int Total { get; set; }

    public IList<T> Items { get; set; }
}

