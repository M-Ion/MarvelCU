import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { baseQueryWithCookieCheck } from "../utils/authCheckQuery.utils";
import INews from "../types/news/INews.mode";
import IUpdateNews from "../types/news/IUpdateNews.model";
import ICreateNews from "../types/news/ICreateNews.model";

const newsService = createApi({
  reducerPath: "news/service",
  baseQuery: baseQueryWithCookieCheck(),
  endpoints: (build) => ({
    fetchNews: build.query<INews[], undefined>({
      query: () => ({
        url: "/News",
      }),
    }),
    postNews: build.mutation<void, ICreateNews>({
      query: (news: INews) => ({ url: "/News", method: "POST", body: news }),
    }),

    updateNews: build.mutation<void, IUpdateNews>({
      query: (news: IUpdateNews) => ({
        url: "/News",
        method: "PUT",
        body: news,
      }),
    }),
  }),
});

export default newsService;
