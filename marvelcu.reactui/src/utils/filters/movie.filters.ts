import IFilter from "../../types/processing/IFilter.model";
import Op from "../../types/processing/Op";
import Saga from "../../types/movie/Sagas";

const moviePhaseFilters: IFilter[] = [
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 1 },
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 2 },
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 3 },
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 4 },
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 5 },
  { prop: "mcuPhase", operation: Op[Op.Eq], value: 6 },
];

const movieSagaFilters: IFilter[] = [
  { prop: "mcuSaga", operation: Op[Op.Eq], value: Saga.Infinity },
  { prop: "mcuSaga", operation: Op[Op.Eq], value: Saga.Multiverse },
];

const movieFilters: { label: string; filters: IFilter[] }[] = [
  { label: "MCU Phase", filters: moviePhaseFilters },
  { label: "MCU Saga", filters: movieSagaFilters },
];

export default movieFilters;
