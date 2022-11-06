import { useEffect, useRef, useState } from "react";

import IFilter from "../types/processing/IFilter.model";
import IPagingRequest from "../types/processing/IPagingRequest.model";
import ISortingRequest from "../types/processing/ISortingRequest.model";
import SortDirection from "../types/processing/SortDirection.model";

export default function usePagingReques<T>(pageSize: number = 8) {
  // Items
  const [data, setData] = useState<T[]>([]);

  // Total data
  const total = useRef<number>(0);

  // Paging
  const [paging, setPaging] = useState<IPagingRequest>({
    pageIndex: 0,
    pageSize,
  });

  // Sorting
  const [sorting, setSorting] = useState<ISortingRequest>({
    sort: null,
    direction: SortDirection.Asc,
  });

  // Filters
  const [filters, setFilters] = useState<IFilter[]>([]);

  return {
    total,
    data,
    setData,
    paging,
    setPaging,
    sorting,
    setSorting,
    filters,
    setFilters,
  };
}
