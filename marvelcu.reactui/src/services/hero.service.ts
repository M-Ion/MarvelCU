import { createApi } from "@reduxjs/toolkit/dist/query/react";

import baseQueryWithAuthCheck from "../utils/authCheckQuery.utils";
import IGetHero from "../types/hero/IGetHero.mode";
import IHero from "../types/hero/IHero.mode";
import { IPostHero } from "../types/hero/IPostHero.model";

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
  }),
});

export default heroService;
