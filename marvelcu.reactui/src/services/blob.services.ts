import { createApi } from "@reduxjs/toolkit/dist/query/react";

import baseQueryWithAuthCheck from "../utils/authCheckQuery.utils";

const blobService = createApi({
  reducerPath: "blob/service",
  baseQuery: baseQueryWithAuthCheck,
  endpoints: (build) => ({
    fetchBlob: build.query<
      { blob: string },
      { container: string; blob: string }
    >({
      query: (params: { container: string; blob: string }) => ({
        url: `/Blobs/Blob/${params.container}/${params.blob}`,
      }),
    }),
  }),
});

export default blobService;
