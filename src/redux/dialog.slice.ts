import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TinitialState = { open: boolean; children: JSX.Element | null };
const initialState: TinitialState = {
  open: false,
  children: null,
};
const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    toggleDialog: (state, { payload }: PayloadAction<JSX.Element>) => {
      state.open = true;
      state.children = payload;
    },
    closeDialog(state) {
      state.open = false;
      state.children = null;
    },
  },
});

const { actions, reducer } = dialogSlice;
export const { toggleDialog, closeDialog } = actions;

export default reducer;
