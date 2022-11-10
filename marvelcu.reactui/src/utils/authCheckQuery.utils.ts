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

    const queryCookiesResult = await baseQuery(
      "application/json; charset=utf-8"
    )("/Auth", api, extraOptions);

    if (queryCookiesResult?.data) {
      const cookies = queryCookiesResult?.data as { token: string };
      // api.dispatch(
      //   setAlert({
      //     type: "success",
      //     message: "Operation completed successfully",
      //   })
      // );
      api.dispatch(setToken(cookies.token));
    } else {
      api.dispatch(logOut());
    }

    return queryResult;
  };

// const baseQueryWithAuthCheck =
//   (contentType: string = "application/json; charset=utf-8") =>
//   async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
//     // Fetch base query
//     let result = await baseQuery(contentType)(args, api, extraOptions);
//     let customError: CustomError;

//     // Verify if status is unathorized try refresh jwt
//     if ((result?.error as FetchBaseQueryError)?.status === 401) {
//       const user = (api.getState() as RootState).currentUser.user;
//       customError = (result.error as CustomFetchError).data;

//       // Refresh jwt
//       let resultOnRefresh = await baseQuery("application/json; charset=utf-8")(
//         "/Auth/Refresh",
//         api,
//         extraOptions
//       );

//       // Set new credentials in case of successful refresh jwt
//       if (resultOnRefresh?.data) {
//         api.dispatch(
//           setCredentials({
//             ...(resultOnRefresh.data as { token: string }),
//             user,
//           })
//         );

//         result = await baseQuery(contentType)(args, api, extraOptions);
//       } else {
//         // Logout in case of refresh token expired
//         console.log(user);
//         api.dispatch(
//           setAlert({
//             type: "warning",
//             message: "Your are not logged in",
//           })
//         );
//         api.dispatch(logOut());
//       }
//     } else if (result?.error) {
//       customError = (result.error as CustomFetchError).data;

//       api.dispatch(
//         setAlert({
//           type: "error",
//           message: customError?.Message,
//         })
//       );
//     }

//     return result;
//   };

// export default baseQueryWithAuthCheck;
