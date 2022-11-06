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
import { logOut, setCredentials } from "../store/reducers/user.slice";
import { setAlert } from "../store/reducers/alerts.slice";

import { RootState } from "../store/store";
import CustomError from "../types/customError.model";

interface CustomFetchError {
  data: CustomError;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL as string,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json; charset=utf-8");

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

const baseQueryWithAuthCheck = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  // Fetch base query
  let result = await baseQuery(args, api, extraOptions);
  let customError: CustomError;

  // Verify if status is unathorized try refresh jwt
  if ((result?.error as FetchBaseQueryError)?.status === 401) {
    const user = (api.getState() as RootState).currentUser.user;
    customError = (result.error as CustomFetchError).data;

    // Refresh jwt
    let resultOnRefresh = await baseQuery("/Auth/Refresh", api, extraOptions);

    // Set new credentials in case of successful refresh jwt
    if (resultOnRefresh?.data) {
      api.dispatch(
        setCredentials({ ...(resultOnRefresh.data as { token: string }), user })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      // Logout in case of refresh token expired

      api.dispatch(
        setAlert({
          type: "warning",
          message: "Your are not logged in",
        })
      );
      api.dispatch(logOut());
    }
  } else if (result?.error) {
    customError = (result.error as CustomFetchError).data;

    api.dispatch(
      setAlert({
        type: "error",
        message: customError?.Message,
      })
    );
  }

  return result;
};

export default baseQueryWithAuthCheck;
