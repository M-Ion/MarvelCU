import { AuthRegister, AuthRespone, Login } from "../types/auth.types";
import { CookieResp } from "../types/response.types";
import apiService from "./api.service";

const controller: string = "Auth";

const authService = apiService
  .enhanceEndpoints({ addTagTypes: ["User"] })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchAuthCookies: build.mutation<CookieResp, void>({
        query: () => ({
          url: `/${controller}`,
          method: "GET",
        }),
      }),

      fetchUserSession: build.mutation<AuthRespone, void>({
        query: () => ({
          url: `${controller}/Session`,
          method: "GET",
        }),
      }),

      login: build.mutation<AuthRespone, Login>({
        query: (arg) => ({
          url: `${controller}/Login`,
          body: arg,
          method: "POST",
        }),
      }),

      register: build.mutation<void, AuthRegister>({
        query: (arg) => ({
          url: `${controller}/Register`,
          body: arg,
          method: "POST",
        }),
      }),

      logout: build.mutation<void, void>({
        query: () => ({
          url: `${controller}/Logout`,
          method: "POST",
        }),
      }),
    }),
  });

export default authService;
