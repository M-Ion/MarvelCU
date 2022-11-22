import { GetActor } from "./entites/actor.types";
import { GetHero } from "./entites/hero.types";
import { GetMovie } from "./entites/movie.types";
import { Review } from "./entites/review.types";

export interface GetUser {
  id: string;
  firstName: string;
  lastName: string;
}

export interface User extends GetUser {
  boughtMovies: readonly GetMovie[];
  favouriteActors: readonly GetActor[];
  favouriteHeroes: readonly GetHero[];
  favouriteMovies: readonly GetMovie[];
  reviews: readonly Review[];
  roles: readonly string[];
  token: string;
}
