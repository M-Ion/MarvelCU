import IGetActor from "../actor/IGetActor.model";
import IGetHero from "../hero/IGetHero.mode";
import IGetReview from "../review/IGetReview.model";

export default interface IMovie {
  id: number;
  name: string;
  premiere: Date;
  description: string;
  rating: number;
  mcuPhase: number;
  mcuSaga: number;
  blob?: string;
  actors: IGetActor[];
  heroes: IGetHero[];
  reviews: IGetReview[];
}
