import { BaseEntity } from "./base.types";

export interface News extends BaseEntity {
  title: string;
  content: string;
  posted: Date;
  updated: Date | null;
}

export interface PostNews {
  title: string;
  content: string;
}

export type UpdateNews = Partial<PostNews>;
