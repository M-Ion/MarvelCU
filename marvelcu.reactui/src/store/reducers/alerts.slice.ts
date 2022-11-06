import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IAlertsState {
  time: string | null;
  type: "error" | "success" | "warning" | null;
  message: string | null;
}

interface IAlert {
  type: "error" | "success" | "warning" | null;
  message: string | null;
}

const initialState: IAlertsState = {
  time: null,
  type: null,
  message: null,
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlert: (
      state: IAlertsState,
      { payload }: PayloadAction<IAlert | null>
    ) => {
      state.time = new Date().toString();
      state.type = payload?.type ?? null;
      state.message = payload?.message ?? null;
    },
  },
});

export const { setAlert } = alertsSlice.actions;

export const selectAlert = (state: RootState) => state.alerts;
export const selectMessage = (state: RootState) => state.alerts.message;

export default alertsSlice.reducer;
