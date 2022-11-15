import { combineReducers, configureStore } from "@reduxjs/toolkit";

// RTK Query services
import actorService from "../services/actor.service";
import alertsReducer from "./reducers/alerts.slice";
import authService from "../services/auth.service";
import blobService from "../services/blob.services";
import heroService from "../services/hero.service";
import newsService from "../services/news.service";

// Redux Toolkit reducers
import userReducer from "../store/reducers/user.slice";
import imdbService from "../services/imdb/imdb.service";
import apiSlice from "../services/api.slice";

const root = combineReducers({
  currentUser: userReducer,
  alerts: alertsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [actorService.reducerPath]: actorService.reducer,
  [authService.reducerPath]: authService.reducer,
  [blobService.reducerPath]: blobService.reducer,
  [heroService.reducerPath]: heroService.reducer,
  [imdbService.reducerPath]: imdbService.reducer,
  // [movieService.reducerPath]: movieService.reducer,
  [newsService.reducerPath]: newsService.reducer,
  // [reviewService.reducerPath]: reviewService.reducer,
});

export const store = configureStore({
  reducer: root,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      actorService.middleware,
      authService.middleware,
      blobService.middleware,
      heroService.middleware,
      imdbService.middleware,
      // movieService.middleware,
      newsService.middleware,
      // reviewService.middleware,
    ]),
});

export type RootState = ReturnType<typeof root>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
