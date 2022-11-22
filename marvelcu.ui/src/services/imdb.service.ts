import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ImdbActor, ImdbTitle } from "../types/imdb.types";

const { REACT_APP_IMDB_URL, REACT_APP_IMDB_API_KEY, REACT_APP_IMDB_HOST } =
  process.env;

const baseQuery = fetchBaseQuery({
  baseUrl: REACT_APP_IMDB_URL as string,
  prepareHeaders: (headers) => {
    headers.set("X-RapidAPI-Key", REACT_APP_IMDB_API_KEY as string);
    headers.set("X-RapidAPI-Host", REACT_APP_IMDB_HOST as string);

    return headers;
  },
});

const imdbService = createApi({
  reducerPath: "imdb/service",
  baseQuery,
  endpoints: (build) => ({
    getFullCredits: build.mutation<ImdbTitle, string>({
      query: (id) => ({
        url: "title/get-full-credits",
        params: { tconst: id },
      }),
    }),
    getActorFilmography: build.mutation<ImdbActor, string>({
      query: (id) => ({
        url: "actors/get-all-filmography",
        params: { nconst: id },
      }),
    }),
  }),
});

export default imdbService;
