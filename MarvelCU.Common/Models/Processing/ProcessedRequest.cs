using Microsoft.AspNetCore.Mvc;

namespace MarvelCU.Common.Models.Processing;

public class ProcessedRequest
{
    public PagingRequest Paging { get; set; }

    public SortingRequest Sorting { get; set; }

    public IList<Filter> Filters { get; set; }
}

