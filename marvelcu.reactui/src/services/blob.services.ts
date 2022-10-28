import { createApi } from "@reduxjs/toolkit/dist/query/react";
import IGetBlob from "../types/blob/IGetBlob.model";

import baseQueryWithAuthCheck from "../utils/authCheckQuery.utils";

const blobService = createApi({
  reducerPath: "blob/service",
  baseQuery: baseQueryWithAuthCheck,
  endpoints: (build) => ({
    fetchBlob: build.query<{ blob: string }, IGetBlob>({
      query: (params: IGetBlob) => ({
        url: `/Blobs/Blob/${params.container}/${params.blob}`,
      }),
    }),
  }),
});

export default blobService;
