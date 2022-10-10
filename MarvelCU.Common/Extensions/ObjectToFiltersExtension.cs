using MarvelCU.Common.Models.Processing;
using System.Collections;
using System.Reflection;

namespace MarvelCU.Common.Extensions;

public static class ObjectToFiltersExtension
{
    public static IList<Filter> ConvertToFilters(this object obj)
    {
        List<Filter> filters = new();

        foreach (PropertyInfo prop in obj.GetType().GetProperties())
        {
            if (prop.GetValue(obj) is not null)
            {
                filters.Add(new Filter { Prop = prop.Name, Value = prop.GetValue(obj) });
            }
        }

        return filters;
    }
}

