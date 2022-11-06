import IGetActor from "../actor/IGetActor.model";
import IGetHero from "../hero/IGetHero.mode";
import IGetReview from "../review/IGetReview.model";

export default interface IMovie {
  actors: IGetActor[];
  blob?: string;
  description: string;
  heroes: IGetHero[];
  id: number;
  mcuPhase: number;
  mcuSaga: number;
  name: string;
  premiere: Date;
  rating: number;
  reviews: IGetReview[];
  youTubeTrailerId: string | null;
}
