import { createApi } from "@reduxjs/toolkit/dist/query/react";
import IActor from "../types/actor/IActor.model";
import IGetActor from "../types/actor/IGetActor.model";
import baseQueryWithAuthCheck from "../utils/authCheckQuery.utils";

const actorService = createApi({
  reducerPath: "actor/service",
  baseQuery: baseQueryWithAuthCheck,
  endpoints: (build) => ({
    fetchActors: build.query<IGetActor[], undefined>({
      query: () => ({
        url: "/Actors",
      }),
    }),
    fetchActor: build.query<IActor, number>({
      query: (id: number) => ({
        url: `/Actors/${id}`,
      }),
    }),
  }),
});

export default actorService;
