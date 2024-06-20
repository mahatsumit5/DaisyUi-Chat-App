import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TinitialState = {
  page: number;
};
const initialState: TinitialState = { page: 1 };
const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
  },
});

export default paginationSlice.reducer;
export const { setPage } = paginationSlice.actions;
