import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = { isOpen: false, postId: "" };
const commentDrawerSlice = createSlice({
  name: "commentDrawer",
  initialState,
  reducers: {
    toggleCommentDrawer: (state, { payload }: PayloadAction<string>) => {
      state.isOpen = !state.isOpen;
      state.postId = payload;
    },
  },
});

const { actions, reducer } = commentDrawerSlice;
export const { toggleCommentDrawer } = actions;

export default reducer;
