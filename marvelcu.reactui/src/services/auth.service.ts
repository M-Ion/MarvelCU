import { createApi } from "@reduxjs/toolkit/dist/query/react";

import IAuthRegister from "../types/auth/authRegister.model";
import IAuthResponse from "../types/auth/authResponse.model";
import baseQuery from "../utils/baseQuery.utils";

const authService = createApi({
  reducerPath: "auth/service",
  baseQuery,
  endpoints: (build) => ({
    checkAuthCookies: build.query<
      { token: string; refreshToken: string },
      undefined
    >({
      query: () => ({
        url: "/Auth",
      }),
    }),

    login: build.mutation<IAuthResponse, { email: string; password: string }>({
      query: (credentials: { email: string; password: string }) => ({
        url: "/Auth/Login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: build.mutation<IAuthResponse, IAuthRegister>({
      query: (credentials: IAuthRegister) => ({
        url: "/Auth/Register",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: build.mutation<void, undefined>({
      query: () => ({
        url: "/Auth/Logout",
        method: "POST",
      }),
    }),
  }),
});

export default authService;
