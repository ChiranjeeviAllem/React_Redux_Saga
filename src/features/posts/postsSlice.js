import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    lastUpdated: null,
  },
  reducers: {
    fetchPostsRequested(state) {
      state.status = "loading";
      state.error = null;
    },
    fetchPostsSucceeded(state, action) {
      state.items = action.payload.items;
      state.lastUpdated = action.payload.receivedAt;
      state.status = "succeeded";
    },
    fetchPostsFailed(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { fetchPostsRequested, fetchPostsSucceeded, fetchPostsFailed } =
  postsSlice.actions;

export default postsSlice.reducer;
