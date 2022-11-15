import IAuthRegister from "../types/auth/authRegister.model";
import IAuthResponse from "../types/auth/authResponse.model";
import apiSlice from "./api.slice";

const authService = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    checkCookiesTokens: build.mutation<
      { token: string; refreshToken: string },
      void
    >({
      query: () => ({
        url: "/Auth",
        method: "GET",
      }),
    }),
    checkUserSession: build.mutation<IAuthResponse, void>({
      query: () => ({
        url: "/Auth/Session",
        method: "GET",
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
