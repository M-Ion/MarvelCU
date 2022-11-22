import { Op } from "../../types/enums/operations.enum";
import { Saga } from "../../types/enums/sagas.enum";
import { ReqFilter } from "../../types/request.types";

const moviePhaseFilters: ReqFilter[] = [
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 1 },
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 2 },
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 3 },
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 4 },
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 5 },
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 6 },
];

const movieSagaFilters: ReqFilter[] = [
  { prop: "mcuSaga", operation: Op[Op.Eq], value: Saga.Infinity },
  { prop: "mcuSaga", operation: Op[Op.Eq], value: Saga.Multiverse },
];

const movieFilters: { label: string; filters: ReqFilter[] }[] = [
  { label: "MCU Phase", filters: moviePhaseFilters },
  { label: "MCU Saga", filters: movieSagaFilters },
];

export const movieSortingProps = [
  "McuPhase",
  "Name",
  "Premiere",
  "McuSaga",
  "Rating",
];

export interface FilterGroup {
  filters: ReqFilter[];
  label: string;
}

export default movieFilters;
