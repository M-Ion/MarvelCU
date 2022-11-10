import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { IPostHero } from "../types/hero/IPostHero.model";
import { baseQueryWithCookieCheck } from "../utils/authCheckQuery.utils";
import IGetHero from "../types/hero/IGetHero.mode";
import IHero from "../types/hero/IHero.mode";
import IProcessedRequest from "../types/processing/IProcessedRequest.model";
import IProcessedResult from "../types/processing/IProcessedResult.model";
import prepareRequestParams from "../utils/prepareParams.utils";

const heroService = createApi({
  reducerPath: "hero/service",
  baseQuery: baseQueryWithCookieCheck(),
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

    postHero: build.mutation<{ id: number }, IPostHero>({
      query: (hero: IPostHero) => ({
        url: "/Heroes",
        method: "POST",
        body: hero,
      }),
    }),

    updateHero: build.mutation<{ id: number }, { id: number; hero: IPostHero }>(
      {
        query: (args: { id: number; hero: IPostHero }) => ({
          url: `/Heroes/${args.id}`,
          method: "PUT",
          body: args.hero,
        }),
      }
    ),

    deleteHero: build.mutation<void, number>({
      query: (id) => ({
        url: `/Heroes/${id}`,
        method: "DELETE",
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

    addToFavourites: build.mutation<void, number>({
      query: (id: number) => ({
        url: `/Heroes/Favourite/${id}`,
        method: "POST",
      }),
    }),

    removeFromFavourite: build.mutation<void, number>({
      query: (id: number) => ({
        url: `/Heroes/Favourite/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default heroService;
