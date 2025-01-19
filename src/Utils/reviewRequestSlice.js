import { createSlice } from "@reduxjs/toolkit";

const reviewRequestSlice = createSlice({
  name: "reviewRequest",
  initialState: null,
  reducers: {
    addReviewRequest: (state, action) => {
      return action.payload;
    },
    removeReviewRequest: (state, action) => {
      const requestIdToRemove = action.payload; // Assuming the payload contains the ID of the request to remove
      return state.filter((request) => request._id !== requestIdToRemove);
    },
  },
});

export const { addReviewRequest, removeReviewRequest } =
  reviewRequestSlice.actions;

export default reviewRequestSlice.reducer;
