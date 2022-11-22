import { Op } from "./enums/operations.enum";
import { SortingDirection } from "./enums/sortings.enum";

export interface ReqFilter {
  prop: string;
  operation: Op;
  value: any;
}

export interface ReqSorting {
  sort: string | null;
  direction: SortingDirection;
}

export interface ReqPaging {
  pageIndex: number | null;
  pageSize: number | null;
}

export interface ReqProcessed {
  paging: ReqPaging;
  sorting: ReqSorting;
  filters: ReqFilter[];
}

export interface ResProcessed<TEntity> {
  items: TEntity[];
  next: ReqProcessed;
  pageIndex: number | null;
  pageSize: number | null;
  total: number;
}
