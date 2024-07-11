import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Socket, io } from "socket.io-client";
// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_ROOTSERVER;
export const socket = io(URL, {
  autoConnect: false,
  query: { email: sessionStorage.getItem("email") },
  transports: ["websocket"],
  withCredentials: true,
});
type TinitialState = {
  isTyping: boolean;
  personTyping: string;
  socket: Socket;
};
const initialState: TinitialState = {
  isTyping: false,
  personTyping: "",
  socket,
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
