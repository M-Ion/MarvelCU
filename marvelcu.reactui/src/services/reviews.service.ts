import IGetReview from "../types/review/IGetReview.model";
import IPostReview from "../types/review/IPostReview.model";
import IUpdateReview from "../types/review/IUpdateReview.model";

import apiSlice from "./api.slice";

export const reviewService = apiSlice.injectEndpoints({
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

      invalidatesTags: (result, _, arg) => [{ type: "Movie", id: arg.movieId }],
    }),

    updateReview: build.mutation<
      IGetReview,
      { fields: IUpdateReview; id: number }
    >({
      query: ({ fields, id }: { fields: IUpdateReview; id: number }) => ({
        url: `/Reviews/${id}`,
        method: "PUT",
        body: fields,
      }),

      invalidatesTags: (result) => [{ type: "Movie", id: result?.movie.id }],
    }),

    deleteReview: build.mutation<void, { reviewId: number; movieId: number }>({
      query: ({
        reviewId,
        movieId,
      }: {
        reviewId: number;
        movieId: number;
      }) => ({
        url: `/Reviews/${reviewId}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, _, arg) => [{ type: "Movie", id: arg.movieId }],
    }),
  }),
});

export default reviewService;
