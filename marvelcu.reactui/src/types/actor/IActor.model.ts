import IGetActor from "./IGetActor.model";
import IGetHero from "../hero/IGetHero.mode";
import IGetMovie from "../movie/IGetMovie.model";

export default interface IActor extends IGetActor {
  movies: IGetMovie[];
  heroes: IGetHero[];
}
