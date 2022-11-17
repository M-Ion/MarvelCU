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
  mcuSaga: 1 | 2;
  name: string;
  premiere: Date;
  price: number;
  rating: number;
  reviews: IGetReview[];
  videoBlob: boolean;
  youTubeTrailerId: string | null;
}
