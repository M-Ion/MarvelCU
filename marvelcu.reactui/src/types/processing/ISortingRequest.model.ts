import SortDirection from "./SortDirection.model";

export default interface ISortingRequest {
  sort: string | null;
  direction: SortDirection;
}
