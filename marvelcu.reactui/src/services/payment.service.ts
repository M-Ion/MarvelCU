import { createApi } from "@reduxjs/toolkit/dist/query/react";

import baseQueryWithAuthCheck from "../utils/authCheckQuery.utils";

const paymentService = createApi({
  reducerPath: "payment/service",
  baseQuery: baseQueryWithAuthCheck,
  endpoints: (build) => ({}),
});

export default paymentService;
