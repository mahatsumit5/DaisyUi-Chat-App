import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatRoom } from "../../types";

type initial = {
  isOpen: boolean;
  chatRoom: IChatRoom | null;
};
type PayloadParams = { isOpen: boolean; chatRoom: IChatRoom | null };

const initialState: initial = {
  chatRoom: null,
  isOpen: false,
};
const homeMessageBox = createSlice({
  name: "HomeMessageBox",
  initialState,

  reducers: {
    toggleMessageBox: (state, { payload }: PayloadAction<PayloadParams>) => {
      (state.isOpen = payload.isOpen), (state.chatRoom = payload.chatRoom);
    },
  },
});

export default homeMessageBox.reducer;
export const { toggleMessageBox } = homeMessageBox.actions;
