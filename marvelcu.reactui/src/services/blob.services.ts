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

    uploadMovieVideoBlob: build.mutation<void, FormData>({
      query: (arg: FormData) => ({
        url: `/Blobs/Movie/Video`,
        body: arg,
        method: "POST",
      }),
    }),

    downloadMovie: build.mutation<null, { id: number | string; name: string }>({
      queryFn: async (
        args: { id: number | string; name: string },
        api,
        extraOptions,
        baseQuery
      ) => {
        const result = await baseQuery({
          url: `/Blobs/Download/Video/${args.id}`,
          responseHandler: (response) => response.blob(),
        });

        if (result.data)
          createHiddenDownloadHref(result.data as Blob, args.name);

        return { data: null };
      },
    }),
  }),
});

const createHiddenDownloadHref = (data: Blob, fileName: string) => {
  const anchor = document.createElement("a");

  const url = window.URL || window.webkitURL;
  const blobVideo = url.createObjectURL(data);

  anchor.href = blobVideo;
  anchor.download = fileName;

  anchor.click();
};

export default blobService;
