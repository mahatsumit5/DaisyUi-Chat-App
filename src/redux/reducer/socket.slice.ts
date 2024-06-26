import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Socket, io } from "socket.io-client";
// "undefined" means the URL will be computed from the `window.location` object
const URL = !import.meta.env.PROD
  ? "http://192.168.20.8:8080"
  : "https://messenger-j2bf.onrender.com";
export const socket = io(URL, {
  autoConnect: false,
  query: { id: sessionStorage.getItem("id") },
  transports: ["websocket"],
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
