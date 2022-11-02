import { createApi } from "@reduxjs/toolkit/dist/query/react";

import baseQueryWithAuthCheck from "../utils/authCheckQuery.utils";
import IActor from "../types/actor/IActor.model";
import IGetActor from "../types/actor/IGetActor.model";
import IProcessedRequest from "../types/processing/IProcessedRequest.model";
import IProcessedResult from "../types/processing/IProcessedResult.model";
import prepareRequestParams from "../utils/prepareParams.utils";

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
  }),
});

export default actorService;
