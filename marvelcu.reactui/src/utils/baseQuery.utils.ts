import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL as string,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json; charset=utf-8");

    return headers;
  },
  credentials: "include",
});

export default baseQuery;
