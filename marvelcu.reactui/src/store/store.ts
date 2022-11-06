import { combineReducers, configureStore } from "@reduxjs/toolkit";

// RTK Query services
import actorService from "../services/actor.service";
import alertsReducer from "./reducers/alerts.slice";
import authService from "../services/auth.service";
import blobService from "../services/blob.services";
import heroService from "../services/hero.service";
import movieService from "../services/movie.service";
import newsService from "../services/news.service";
import paymentService from "../services/payment.service";
import reviewService from "../services/reviews.service";

// Redux Toolkit reducers
import userReducer from "../store/reducers/user.slice";

const root = combineReducers({
  currentUser: userReducer,
  alerts: alertsReducer,
  [actorService.reducerPath]: actorService.reducer,
  [authService.reducerPath]: authService.reducer,
  [blobService.reducerPath]: blobService.reducer,
  [heroService.reducerPath]: heroService.reducer,
  [movieService.reducerPath]: movieService.reducer,
  [newsService.reducerPath]: newsService.reducer,
  [paymentService.reducerPath]: paymentService.reducer,
  [reviewService.reducerPath]: reviewService.reducer,
});

export const store = configureStore({
  reducer: root,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      actorService.middleware,
      authService.middleware,
      blobService.middleware,
      heroService.middleware,
      movieService.middleware,
      newsService.middleware,
      paymentService.middleware,
      reviewService.middleware,
    ]),
});

export type RootState = ReturnType<typeof root>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
