import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IimdbTitle, { IimdbActor } from "../../types/imdbTitle.model";

const imdbService = createApi({
  reducerPath: "imdb",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_IMDB_URL as string,
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        process.env.REACT_APP_IMDB_API_KEY as string
      );
      headers.set("X-RapidAPI-Host", process.env.REACT_APP_IMDB_HOST as string);

      return headers;
    },
  }),
  endpoints: (build) => ({
    getFullCredits: build.mutation<IimdbTitle, string>({
      query: (id: string) => ({
        url: "title/get-full-credits",
        params: { tconst: id },
      }),
    }),
    getActorFilmography: build.mutation<IimdbActor, string>({
      query: (id: string) => ({
        url: "actors/get-all-filmography",
        params: { nconst: id },
      }),
    }),
  }),
});

export default imdbService;
