import { BaseEntity } from "./base.types";
import { GetActor } from "./actor.types";
import { GetMovie } from "./movie.types";

export interface GetHero extends BaseEntity {
  blob: string | null;
  name: string;
}

export interface Hero extends GetHero {
  actors: readonly GetActor[];
  description: string;
  movies: readonly GetMovie[];
}

export interface PostHero {
  name: string;
  description: string;
  moviesIds: number[];
}
