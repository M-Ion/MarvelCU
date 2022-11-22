import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";
import { ErrorTypes } from "../types/enums/error.enums";
import { BackError, BackErrorData } from "../types/error.types";
import { CookieResp } from "../types/response.types";
import {
  setErrorFeedback,
  setWarningFeedback,
} from "./store/slices/feedback.slice";
import { logout, setAuthToken } from "./store/slices/user.slice";
import { RootState } from "./store/store";

export const baseQuery = (
  contentType: string = "application/json; charset=utf-8"
) =>
  fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL as string,
    prepareHeaders: (headers, { getState }) => {
      if (contentType) {
        headers.set("Content-Type", contentType);
      }

      const jwt = (getState() as RootState).user.jwt;
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }

      return headers;
    },

    credentials: "include",
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError | BackError,
    {},
    FetchBaseQueryMeta
  >;

export const baseQueryWithSession =
  (contentType: string = "application/json; charset=utf-8") =>
  async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    const query = baseQuery(contentType);
    const response = await query(args, api, extraOptions);

    if (response.error) {
      handleFetchError(response.error, api);

      return response;
    }

    const cookiesResp = await baseQuery("application/json; charset=utf-8")(
      "/Auth",
      api,
      extraOptions
    );

    if (cookiesResp.data) {
      const authCookies = cookiesResp.data as CookieResp;
      api.dispatch(setAuthToken(authCookies.token));
    }

    return response;
  };

const handleFetchError = (
  errorResp: FetchBaseQueryError | BackError,
  api: BaseQueryApi
) => {
  const error = (errorResp as BackError).data;

  if (error) handleBackendError(error, api);
  else if ((errorResp as FetchBaseQueryError).status === 401) {
    api.dispatch(setWarningFeedback("You are not logged in"));
    api.dispatch(logout());
    window.location.replace("/login");
  }
};

const handleBackendError = (error: BackErrorData, api: BaseQueryApi) => {
  if (error.Type === ErrorTypes.Token) {
    api.dispatch(setWarningFeedback("You are not logged in"));
    api.dispatch(logout());

    return;
  }

  if (error.StatusCode === 500) {
    api.dispatch(
      setErrorFeedback("Something goes wrong, please try again later")
    );
  } else if (error.StatusCode === 400) {
    api.dispatch(setErrorFeedback(error.Message));
  }

  return;
};
