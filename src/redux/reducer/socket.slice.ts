import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type TinitialState = {
  isTyping: boolean;
  personTyping: string;
};
const initialState: TinitialState = {
  isTyping: false,
  personTyping: "",
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setTyping(
      state,
      { payload }: PayloadAction<{ typing: boolean; person: string }>
    ) {
      state.isTyping = payload.typing;
      state.personTyping = payload.person;
    },
  },
});
export const { setTyping } = socketSlice.actions;
export default socketSlice.reducer;
