import SortDirection from "./SortDirection.model";

export default interface ISortingRequest {
  prop: string | null;
  direction: SortDirection;
}
