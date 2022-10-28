import IFilter from "./IFilter.model";
import IPagingRequest from "./IPagingRequest.model";
import ISortingRequest from "./ISortingRequest.model";

export default interface IProcessedRequest {
  paging: IPagingRequest;
  sorting: ISortingRequest;
  filters: IFilter[];
}
