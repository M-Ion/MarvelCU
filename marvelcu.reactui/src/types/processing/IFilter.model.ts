import Op from "./Op";

export default interface IFilter {
  prop: string;
  operation: Op;
  value: any;
}
