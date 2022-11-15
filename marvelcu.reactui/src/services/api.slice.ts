import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithCookieCheck } from "../utils/authCheckQuery.utils";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithCookieCheck(),
  tagTypes: ["Movie"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
