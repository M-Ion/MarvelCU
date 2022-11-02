import IGetActor from "./actor/IGetActor.model";
import IGetHero from "./hero/IGetHero.mode";
import IGetMovie from "./movie/IGetMovie.model";

export default interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  favouriteMovies: IGetMovie[];
  favouriteHeroes: IGetHero[];
  favouriteActors: IGetActor[];
}
