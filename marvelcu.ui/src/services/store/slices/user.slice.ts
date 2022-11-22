import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../../types/user.types";
import { RootState } from "../store";

export interface UserState {
  user: User | null;
  jwt: string | null;
}

const initialState: UserState = {
  user: null,
  jwt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state: UserState,
      { payload }: PayloadAction<UserState>
    ) => {
      state.user = payload.user;
      state.jwt = payload.jwt;
    },
    setUser: (state: UserState, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    setAuthToken: (state: UserState, { payload }: PayloadAction<string>) => {
      state.jwt = payload;
    },
    logout: (state: UserState) => {
      state = initialState;
    },
  },
});

export const { setUser, setAuthToken, logout, setCredentials } =
  userSlice.actions;

export const selectJwt = (state: RootState) => state.user.jwt;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
