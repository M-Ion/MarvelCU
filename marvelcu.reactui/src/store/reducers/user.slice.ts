import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IUser from "../../types/user.model";

interface IUserState {
  user: IUser | null;
  token: string;
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
    logOut: (state: IUserState) => {
      state = { ...initialState };
    },
  },
});

export const { setCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;
