import { GetMovie } from "./movie.types";
import { GetUser } from "../user.types";
import { BaseEntity } from "./base.types";

export interface Review extends BaseEntity {
  movie: GetMovie;
  opinion: string;
  rating: number;
  user: GetUser;
}

export interface PostReview {
  opinion: string;
  rating: number;
}

export type UpdateReview = Partial<PostReview>;
