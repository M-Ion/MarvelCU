import { createApi } from "@reduxjs/toolkit/dist/query/react";

import baseQueryWithAuthCheck from "../utils/authCheckQuery.utils";
import IGetMovie from "../types/movie/IGetMovie.model";
import IMovie from "../types/movie/IMovie.model";
import IPostMovie from "../types/movie/IPostMovie.model";
import IProcessedRequest from "../types/processing/IProcessedRequest.model";
import IProcessedResult from "../types/processing/IProcessedResult.model";
import prepareRequestParams from "../utils/prepareParams.utils";

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
      query: (arg: IProcessedRequest) => ({
        url: "/Movies/Filter",
        method: "POST",
        body: arg.filters,
        params: prepareRequestParams(arg),
      }),
    }),
  }),
});

export default movieService;
