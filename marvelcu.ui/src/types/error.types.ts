import { ErrorTypes } from "./enums/error.enums";

export interface BackError {
  data: BackErrorData;
}

export interface BackErrorData {
  Message: string;
  StatusCode: number;
  Type: ErrorTypes;
}
