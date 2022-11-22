import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type FeedbackStatus = "success" | "error" | "warning";

export interface FeedbackState {
  message: string | null;
  status: FeedbackStatus | null;
  time: string | null;
}

const initialState: FeedbackState = {
  message: null,
  status: null,
  time: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setSuccessFeedback: (
      state: FeedbackState,
      { payload }: PayloadAction<string>
    ) => {
      state.message = payload;
      state.status = "success";
      state.time = new Date().toString();
    },
    setErrorFeedback: (
      state: FeedbackState,
      { payload }: PayloadAction<string>
    ) => {
      state.message = payload;
      state.status = "error";
      state.time = new Date().toString();
    },
    setWarningFeedback: (
      state: FeedbackState,
      { payload }: PayloadAction<string>
    ) => {
      state.message = payload;
      state.status = "warning";
      state.time = new Date().toString();
    },
  },
});

export const { setSuccessFeedback, setErrorFeedback, setWarningFeedback } =
  feedbackSlice.actions;

export const selectFeedback = (state: RootState) => state.feedback;

export default feedbackSlice.reducer;
