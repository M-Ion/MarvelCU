import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IUser from "../../types/user.model";
import { RootState } from "../store";

interface IUserState {
  user: IUser | null;
  token: string | null;
}

const initialState: IUserState = {
  user: null,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state: IUserState,
      { payload }: PayloadAction<IUserState>
    ) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    setToken: (state: IUserState, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setUser: (state: IUserState, { payload }: PayloadAction<IUser | null>) => {
      state.user = payload;
    },
    logOut: (state: IUserState) => {
      state = { ...initialState };
    },
  },
});

export const { setCredentials, setToken, logOut, setUser } = userSlice.actions;

export const selectCredentials = (state: RootState) => state.currentUser;
export const selectCurrentUser = (state: RootState) => state.currentUser.user;
export const selectCurrentJwt = (state: RootState) => state.currentUser.token;

export default userSlice.reducer;
