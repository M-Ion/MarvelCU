import {
  PostReview,
  Review,
  UpdateReview,
} from "../../types/entites/review.types";
import apiService from "../api.service";

const controller: string = "Reviews";

const reviewService = apiService.injectEndpoints({
  endpoints: (build) => ({
    createEntity: build.mutation<void, { arg: PostReview; movieId: number }>({
      query: ({ arg, movieId }) => ({
        url: `/${controller}/${movieId}`,
        method: "POST",
        body: arg,
      }),

      invalidatesTags: (result, _, arg) => [
        { type: "Movies", id: arg.movieId },
      ],
    }),

    updateReview: build.mutation<Review, { arg: UpdateReview; id: number }>({
      query: ({ arg, id }) => ({
        url: `/${controller}/${id}`,
        method: "PUT",
        body: arg,
      }),

      invalidatesTags: (result) => [{ type: "Movies", id: result?.movie.id }],
    }),

    deleteReview: build.mutation<void, { id: number; movieId: number }>({
      query: (arg) => ({
        url: `/${controller}/${arg.id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, _, arg) => [
        { type: "Movies", id: arg.movieId },
      ],
    }),
  }),
});

export default reviewService;
