import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Feedback } from "./feedbackApiSlice";

interface FeedbackState {
  feedbacks: Feedback[];
}

const initialState: FeedbackState = {
  feedbacks: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbacks: (state, action: PayloadAction<Feedback[]>) => {
      state.feedbacks = action.payload;
    },
    removeFeedback: (state, action: PayloadAction<string>) => {
      state.feedbacks = state.feedbacks.filter((f) => f._id !== action.payload);
    },
  },
});

export const { setFeedbacks, removeFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
