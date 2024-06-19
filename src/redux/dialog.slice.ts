import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TinitialState = { open: boolean; content: string; heading: string };

interface IPayload {
  content: string;
  heading: string;
}
const initialState: TinitialState = {
  open: false,
  content: "",
  heading: "",
};
const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    toggleDialog: (state, { payload }: PayloadAction<IPayload>) => {
      state.open = true;
      state.content = payload.content;
      state.heading = payload.heading;
    },
    closeDialog(state) {
      state.open = false;
      state.content = "";
      state.heading = "";
    },
  },
});

const { actions, reducer } = dialogSlice;
export const { toggleDialog, closeDialog } = actions;

export default reducer;
