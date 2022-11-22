import { useEffect, useRef, useState } from "react";
import { SortingDirection } from "../types/enums/sortings.enum";
import { ReqFilter, ReqPaging, ReqSorting } from "../types/request.types";

export default function usePaging<T>(pageSize: number = 8): UsePagingType<T> {
  const [data, setData] = useState<T[]>([]);

  const total = useRef<number>(0);

  const [paging, setPaging] = useState<ReqPaging>({
    pageIndex: 0,
    pageSize,
  });

  const [sorting, setSorting] = useState<ReqSorting>({
    sort: null,
    direction: SortingDirection.Asc,
  });

  const [filters, setFilters] = useState<ReqFilter[]>([]);

  useEffect(() => {
    setPaging({ pageIndex: 0, pageSize });
  }, [filters, pageSize]);

  return {
    total,
    dataState: [data, setData],
    pagingState: [paging, setPaging],
    sortingState: [sorting, setSorting],
    filtersState: [filters, setFilters],
  };
}

export type UsePagingType<T> = {
  total: React.MutableRefObject<number>;
  dataState: [T[], React.Dispatch<React.SetStateAction<T[]>>];
  pagingState: [ReqPaging, React.Dispatch<React.SetStateAction<ReqPaging>>];
  sortingState: [ReqSorting, React.Dispatch<React.SetStateAction<ReqSorting>>];
  filtersState: [
    ReqFilter[],
    React.Dispatch<React.SetStateAction<ReqFilter[]>>
  ];
};
