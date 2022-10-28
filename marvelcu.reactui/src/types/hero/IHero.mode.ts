import IGetActor from "../actor/IGetActor.model";
import IGetHero from "./IGetHero.mode";
import IGetMovie from "../movie/IGetMovie.model";

export default interface IHero extends IGetHero {
  description: string;
  actors: IGetActor[];
  movies: IGetMovie[];
}
