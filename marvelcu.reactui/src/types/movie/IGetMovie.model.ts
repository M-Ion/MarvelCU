export default interface IGetMovie {
  blob?: string;
  id: number;
  mcuPhase: number;
  mcuSaga: number;
  name: string;
  premiere: Date;
  rating: number | null;
}
