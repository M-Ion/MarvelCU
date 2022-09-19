using Newtonsoft.Json;

namespace MarvelCU.Common.Models;

public class ErrorDetails
{
    public int StatusCode { get; set; }

    public string Type { get; set; }

    public string Message { get; set; }

    public override string ToString()
    {
        return JsonConvert.SerializeObject(this);
    }
}

