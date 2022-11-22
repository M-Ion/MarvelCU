import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithSession } from "./authQuery.service";

export type UploadEntityFile = {
  entity: "Movie" | "Actor" | "Hero";
  formData: FormData;
};

const blobService = createApi({
  reducerPath: "blob/service",
  baseQuery: baseQueryWithSession(""),
  endpoints: (build) => ({
    uploadEntityBlob: build.mutation<void, UploadEntityFile>({
      query: (arg) => ({
        url: `/Blobs/${arg.entity}`,
        body: arg.formData,
        method: "POST",
      }),
    }),

    uploadMovieVideoBlob: build.mutation<void, FormData>({
      query: (arg) => ({
        url: `/Blobs/Movie/Video`,
        body: arg,
        method: "POST",
      }),
    }),

    downloadMovie: build.mutation<null, { id: number; name: string }>({
      queryFn: async (args, api, extraOptions, baseQuery) => {
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
