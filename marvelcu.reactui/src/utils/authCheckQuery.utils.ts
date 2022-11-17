import {
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";
import {
  BaseQueryApi,
  BaseQueryFn,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { setAlert } from "../store/reducers/alerts.slice";
import { logOut, setToken } from "../store/reducers/user.slice";

import { RootState } from "../store/store";
import CustomError from "../types/customError.model";

interface CustomFetchError {
  data: CustomError;
}

const baseQuery = (contentType: string = "application/json; charset=utf-8") =>
  fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL as string,
    prepareHeaders: (headers, { getState }) => {
      if (contentType) {
        headers.set("Content-Type", contentType);
      }

      const jwt = (getState() as RootState).currentUser.token;
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }

      return headers;
    },

    credentials: "include",
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError | CustomFetchError,
    {},
    FetchBaseQueryMeta
  >;

export const baseQueryWithCookieCheck =
  (contentType: string = "application/json; charset=utf-8") =>
  async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    const queryResult = await baseQuery(contentType)(args, api, extraOptions);

    if (queryResult?.error) {
      handleFetchError(queryResult.error, api);
      return queryResult;
    }

    const queryCookiesResult = await baseQuery(
      "application/json; charset=utf-8"
    )("/Auth", api, extraOptions);

    if (queryCookiesResult?.data) {
      const cookies = queryCookiesResult?.data as { token: string };
      api.dispatch(setToken(cookies.token));
    }

    return queryResult;
  };

const handleFetchError = (
  errorResp: FetchBaseQueryError | CustomFetchError,
  api: BaseQueryApi
) => {
  const customError = (errorResp as CustomFetchError).data;
  const alert: { type: "success" | "error" | "warning"; message: string } = {
    type: "error",
    message: "",
  };

  if (customError) {
    if (customError.Type === "Token") {
      alert.type = "warning";
      alert.message = "You are not logged in!";

      api.dispatch(logOut());
      // window.location.assign("/login");
    } else if (customError.StatusCode === 400) {
      alert.message = customError.Message;
    } else {
      alert.message = "Something goes wrong, please try again laer";
    }
  } else {
    if ((errorResp as FetchBaseQueryError).status === 401) {
      alert.type = "warning";
      alert.message = "You are not logged in!";

      api.dispatch(logOut());
    }
  }

  api.dispatch(setAlert(alert));
};
