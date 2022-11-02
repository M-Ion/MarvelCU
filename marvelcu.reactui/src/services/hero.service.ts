import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { IPostHero } from "../types/hero/IPostHero.model";
import baseQueryWithAuthCheck from "../utils/authCheckQuery.utils";
import IGetHero from "../types/hero/IGetHero.mode";
import IHero from "../types/hero/IHero.mode";
import IProcessedRequest from "../types/processing/IProcessedRequest.model";
import IProcessedResult from "../types/processing/IProcessedResult.model";
import prepareRequestParams from "../utils/prepareParams.utils";

const heroService = createApi({
  reducerPath: "hero/service",
  baseQuery: baseQueryWithAuthCheck,
  endpoints: (build) => ({
    fetchHeroes: build.query<IGetHero[], undefined>({
      query: () => ({
        url: "/Heroes",
      }),
    }),
    fetchHero: build.query<IHero, number>({
      query: (id: number) => ({
        url: `/Heroes/${id}`,
      }),
    }),

    postHero: build.mutation<void, IPostHero>({
      query: (hero: IPostHero) => ({
        url: "/Heroes",
        method: "POST",
        body: hero,
      }),
    }),
    getFilteredHeroes: build.mutation<
      IProcessedResult<IGetHero>,
      IProcessedRequest
    >({
      query: (arg: IProcessedRequest) => ({
        url: "/Heroes/Filter",
        method: "POST",
        body: arg.filters,
        params: prepareRequestParams(arg),
      }),
    }),
  }),
});

export default heroService;
