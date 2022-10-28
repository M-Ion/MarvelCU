import IProcessedRequest from "../types/processing/IProcessedRequest.model";

type Params = {
  pageIndex?: number;
  pageSize?: number;
  prop?: string;
};

const prepareRequestParams = (arg: IProcessedRequest) => {
  const { paging, sorting } = arg;

  const isPaging = Boolean(
    Boolean(paging.pageIndex || paging.pageIndex === 0) && paging.pageSize
  );
  const isSorting = Boolean(sorting.prop);

  let params: Params = {
    pageIndex: undefined,
    pageSize: undefined,
    prop: undefined,
  };

  if (isPaging) {
    params = {
      ...params,
      pageIndex: paging.pageIndex as number,
      pageSize: paging.pageSize as number,
    };
  }

  if (isSorting) {
    params = {
      ...params,
      prop: sorting.prop as string,
    };
  }

  return params;
};

export default prepareRequestParams;
