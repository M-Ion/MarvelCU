import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { baseQueryWithCookieCheck } from "../utils/authCheckQuery.utils";
import IActor from "../types/actor/IActor.model";
import IGetActor from "../types/actor/IGetActor.model";
import IProcessedRequest from "../types/processing/IProcessedRequest.model";
import IProcessedResult from "../types/processing/IProcessedResult.model";
import prepareRequestParams from "../utils/prepareParams.utils";
import IPostActor from "../types/actor/IPostActor.model";

const actorService = createApi({
  reducerPath: "actor/service",
  baseQuery: baseQueryWithCookieCheck(),
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
    getFilteredActors: build.mutation<
      IProcessedResult<IGetActor>,
      IProcessedRequest
    >({
      query: (arg: IProcessedRequest) => ({
        url: "/Actors/Filter",
        method: "POST",
        body: arg.filters,
        params: prepareRequestParams(arg),
      }),
    }),

    postActor: build.mutation<{ id: number }, IPostActor>({
      query: (actor: IPostActor) => ({
        url: "/Actors",
        method: "POST",
        body: actor,
      }),
    }),

    deleteActor: build.mutation<void, number>({
      query: (id) => ({
        url: `/Actors/${id}`,
        method: "DELETE",
      }),
    }),

    addToFavourites: build.mutation<void, number>({
      query: (id: number) => ({
        url: `/Actors/Favourite/${id}`,
        method: "POST",
      }),
    }),

    removeFromFavourite: build.mutation<void, number>({
      query: (id: number) => ({
        url: `/Actors/Favourite/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default actorService;
