import { ReqPaging, ReqProcessed, ReqSorting } from "../types/request.types";

export type ReqParams = {
  pageIndex?: number;
  pageSize?: number;
  sort?: string;
};

export const prepareReqParams = (arg: ReqProcessed) => {
  const { paging, sorting } = arg;
  let params: ReqParams = {};

  if (isPagingApplied(paging)) {
    params = {
      pageIndex: paging.pageIndex as number,
      pageSize: paging.pageSize as number,
    };
  }

  if (isSortingApplied(sorting)) {
    params = {
      ...params,
      sort: sorting.sort as string,
    };
  }

  return params;
};

const isPagingApplied = (paging: ReqPaging) => {
  return Boolean(
    Boolean(paging.pageIndex || paging.pageIndex === 0) && paging.pageSize
  );
};

const isSortingApplied = (sorting: ReqSorting) => Boolean(sorting.sort);
