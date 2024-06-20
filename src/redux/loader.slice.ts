import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
    content: "Please wait",
  },
  reducers: {
    toggleLoader: (
      state,
      { payload }: PayloadAction<{ isLoading: boolean; content?: string }>
    ) => {
      state.isLoading = payload.isLoading;
      state.content = payload?.content || "Loading...";
    },
  },
});

const { reducer, actions } = loadingSlice;
export default reducer;
export const { toggleLoader } = actions;
