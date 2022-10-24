import IProcessedRequest from "./IProcessedRequest.model";

export default interface IProcessedResult<T> {
  pageIndex: number | null;
  pageSize: number | null;
  total: number;
  items: T[];
  next: IProcessedRequest;
}
