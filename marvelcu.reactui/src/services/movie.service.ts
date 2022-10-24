import { createApi } from "@reduxjs/toolkit/dist/query/react";

import IGetMovie from "../types/movie/IGetMovie.model";
import IMovie from "../types/movie/IMovie.model";
import IPostMovie from "../types/movie/IPostMovie.model";
import IProcessedRequest from "../types/processing/IProcessedRequest.model";
import IProcessedResult from "../types/processing/IProcessedResult.model";
import baseQueryWithAuthCheck from "../utils/authCheckQuery.utils";

const movieService = createApi({
  reducerPath: "movie/service",
  baseQuery: baseQueryWithAuthCheck,
  endpoints: (build) => ({
    fetchMovies: build.query<IGetMovie[], undefined>({
      query: () => ({
        url: "/Movies",
      }),
    }),

    fetchMovie: build.query<IMovie, number>({
      query: (id: number) => ({
        url: `/Movies/${id}`,
      }),
    }),

    postMovie: build.mutation<void, IPostMovie>({
      query: (movie: IPostMovie) => ({
        url: "/Movies",
        method: "POST",
        body: movie,
      }),
    }),

    getFilteredMovies: build.mutation<
      IProcessedResult<IGetMovie>,
      IProcessedRequest
    >({
      query: (body: IProcessedRequest) => ({
        url: "/Movies/Filter",
        method: "POST",
        body,
      }),
    }),
  }),
});

export default movieService;
