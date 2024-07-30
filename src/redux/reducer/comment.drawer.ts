import { createSlice } from "@reduxjs/toolkit";
const initialState = { isOpen: false };
const commentDrawerSlice = createSlice({
  name: "commentDrawer",
  initialState,
  reducers: {
    toggleCommentDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

const { actions, reducer } = commentDrawerSlice;
export const { toggleCommentDrawer } = actions;

export default reducer;
