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
    logOut: (state: IUserState) => {
      state = { ...initialState };
    },
  },
});

export const { setCredentials, setToken, logOut } = userSlice.actions;

export const selectCredentials = (state: RootState) => state.currentUser;
export const selectCurrentUser = (state: RootState) => state.currentUser.user;

export default userSlice.reducer;
