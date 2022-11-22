import { BaseEntity } from "./base.types";
import { GetActor } from "./actor.types";
import { GetHero } from "./hero.types";
import { Review } from "./review.types";
import { Saga } from "../enums/sagas.enum";

export interface GetMovie extends BaseEntity {
  blob: string | null;
  imdbId: string;
  mcuPhase: number;
  mcuSaga: Saga;
  name: string;
  premiere: string;
  rating: number | null;
}

export interface Movie extends GetMovie {
  actors: readonly GetActor[];
  description: string;
  heroes: readonly GetHero[];
  id: number;
  price: number;
  reviews: readonly Review[];
  videoBlob: boolean;
  youTubeTrailerId: string | null;
}

export interface PostMovie {
  actorsIds: number[];
  description: string;
  heroesIds: number[];
  mcuPhase: number;
  mcuSaga: number;
  name: string;
  premiere: Date;
  price: number;
  youTubeTrailerId: string | null;
}
