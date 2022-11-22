import { BaseEntity } from "./base.types";
import { GetHero } from "./hero.types";
import { GetMovie } from "./movie.types";

export interface GetActor extends BaseEntity {
  blob: string | null;
  firstName: string;
  imdbId: string;
  lastName: string | null;
  middleName: string | null;
  name: string;
}

export interface Actor extends GetActor {
  movies: readonly GetMovie[];
  heroes: readonly GetHero[];
}

export interface PostActor {
  firstName: string;
  heroesIds: number[];
  lastName: string | null;
  middleName: string | null;
  moviesIds: number[];
}
