import { combineReducers, configureStore } from "@reduxjs/toolkit";

import apiService from "../api.service";
import blobService from "../blob.service";
import imdbService from "../imdb.service";
import userReducer from "./slices/user.slice";
import feedbackReducer from "./slices/feedback.slice";

const root = combineReducers({
  [apiService.reducerPath]: apiService.reducer,
  [blobService.reducerPath]: blobService.reducer,
  [imdbService.reducerPath]: imdbService.reducer,
  user: userReducer,
  feedback: feedbackReducer,
});

export const store = configureStore({
  reducer: root,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiService.middleware,
      blobService.middleware,
      imdbService.middleware,
    ]),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof root>;
