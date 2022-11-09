import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { baseQueryWithCookieCheck } from "../utils/authCheckQuery.utils";

const blobService = createApi({
  reducerPath: "blob/service",
  baseQuery: baseQueryWithCookieCheck(""),
  endpoints: (build) => ({
    uploadMovieBlob: build.mutation<void, FormData>({
      query: (arg: FormData) => ({
        url: `/Blobs/Movie`,
        body: arg,
        method: "POST",
      }),
    }),
    uploadHeroBlob: build.mutation<void, FormData>({
      query: (arg: FormData) => ({
        url: `/Blobs/Hero`,
        body: arg,
        method: "POST",
      }),
    }),
    uploadActorBlob: build.mutation<void, FormData>({
      query: (arg: FormData) => ({
        url: `/Blobs/Actor`,
        body: arg,
        method: "POST",
      }),
    }),
  }),
});

export default blobService;
