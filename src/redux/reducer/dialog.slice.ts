import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type DialogType = "login" | "request" | "password" | "";
type TinitialState = {
  open: boolean;
  content: string;
  heading: string;
  type: DialogType;
};

interface IPayload {
  content: string;
  heading: string;
  type: DialogType;
}
const initialState: TinitialState = {
  open: false,
  content: "",
  heading: "",
  type: "",
};
const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    toggleDialog: (state, { payload }: PayloadAction<IPayload>) => {
      state.open = true;
      state.content = payload.content;
      state.heading = payload.heading;
      state.type = payload.type;
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
