import { FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { logOut, setCredentials } from "../store/reducers/user.slice";

import { RootState } from "../store/store";

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
});

const baseQueryWithAuthCheck = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  // Fetch base query
  let result = await baseQuery(args, api, extraOptions);

  // Verify if status is unathorized try refresh jwt
  if (result?.error?.status === 401) {
    const user = (api.getState() as RootState).currentUser.user;

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
      api.dispatch(logOut());
    }
  }

  return result;
};

export default baseQueryWithAuthCheck;
