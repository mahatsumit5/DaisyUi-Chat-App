import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};
const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    toggleDialog: (state) => {
      state.open = !state.open;
    },
  },
});

const { actions, reducer } = dialogSlice;
export const { toggleDialog } = actions;

export default reducer;
