import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    skip: 0,
  },
  reducers: {
    setSkip: (state, { payload }: PayloadAction<number>) => {
      state.skip = payload;
    },
  },
});
export default postSlice.reducer;
export const { setSkip } = postSlice.actions;
