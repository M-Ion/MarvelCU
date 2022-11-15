export default interface IPostMovie {
  description: string;
  mcuPhase: number;
  mcuSaga: number;
  name: string;
  premiere: Date;
  price: number;
  youTubeTrailerId: string | null;
  actorsIds: number[];
  heroesIds: number[];
}
