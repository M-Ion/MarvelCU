import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { baseQueryWithCookieCheck } from "../utils/authCheckQuery.utils";
import INews from "../types/news/INews.mode";
import IUpdateNews from "../types/news/IUpdateNews.model";
import ICreateNews from "../types/news/ICreateNews.model";

const newsService = createApi({
  reducerPath: "news/service",
  baseQuery: baseQueryWithCookieCheck(),
  tagTypes: ["News"],
  endpoints: (build) => ({
    fetchNews: build.query<INews[], void>({
      query: () => ({
        url: "/News",
      }),
      providesTags: ["News"],
    }),
    postNews: build.mutation<void, ICreateNews>({
      query: (news: INews) => ({ url: "/News", method: "POST", body: news }),
      invalidatesTags: ["News"],
    }),

    updateNews: build.mutation<void, { id: number; body: IUpdateNews }>({
      query: (arg: { id: number; body: IUpdateNews }) => ({
        url: `/News/${arg.id}`,
        method: "PUT",
        body: arg.body,
      }),
      invalidatesTags: ["News"],
    }),

    deleteNews: build.mutation<void, number>({
      query: (id: number) => ({
        url: `/News/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export default newsService;
