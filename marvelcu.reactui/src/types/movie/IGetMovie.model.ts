export default interface IGetMovie {
  name: string;
  id: number;
  premiere: Date;
  mcuPhase: number;
  mcuSaga: number;
  blob?: string;
}
