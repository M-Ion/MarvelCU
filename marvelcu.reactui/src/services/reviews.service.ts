import { createApi } from "@reduxjs/toolkit/dist/query/react";
import IPostReview from "../types/review/IPostReview.model";
import IUpdateReview from "../types/review/IUpdateReview.model";

import { baseQueryWithCookieCheck } from "../utils/authCheckQuery.utils";

const reviewService = createApi({
  reducerPath: "review/service",
  baseQuery: baseQueryWithCookieCheck(),
  endpoints: (build) => ({
    postReview: build.mutation<void, { fields: IPostReview; movieId: number }>({
      query: ({
        fields,
        movieId,
      }: {
        fields: IPostReview;
        movieId: number;
      }) => ({
        url: `/Reviews/${movieId}`,
        method: "POST",
        body: fields,
      }),
    }),

    updateReview: build.mutation<void, { fields: IUpdateReview; id: number }>({
      query: ({ fields, id }: { fields: IUpdateReview; id: number }) => ({
        url: `/Reviews/${id}`,
        method: "PUT",
        body: fields,
      }),
    }),

    deleteReview: build.mutation<void, number>({
      query: (id: number) => ({
        url: `/Reviews/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default reviewService;
