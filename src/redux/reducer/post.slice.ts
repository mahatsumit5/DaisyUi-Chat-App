import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    page: 1,
  },
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
  },
});
export default postSlice.reducer;
export const { setPage } = postSlice.actions;
