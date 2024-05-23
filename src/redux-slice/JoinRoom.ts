import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChatRoom, IUser, Imessage, room } from "../types";

interface currentRoom {
  currentRoom: room;
  chatRoom: IChatRoom[];
}

const initialState: currentRoom = {
  currentRoom: {
    id: "",
    email: "",
    fName: "",
    isActive: false,
    lName: "",
    profile: "",
    messages: [],
    count: 0,
  },
  chatRoom: [],
};

export const roomSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    joinRoom: (state, { payload }: PayloadAction<IUser>) => {
      state.currentRoom.id = payload.id;
      state.currentRoom.email = payload.email;
      state.currentRoom.fName = payload.fName;
      state.currentRoom.isActive = payload.isActive;
      state.currentRoom.lName = payload.lName;
      state.currentRoom.profile = payload.profile;
    },
    setAvailableRooms: (state, { payload }: PayloadAction<IChatRoom[]>) => {
      state.chatRoom = payload;
    },
    setMessages: (
      state,
      { payload }: PayloadAction<{ message: Imessage[]; _count: number }>
    ) => {
      state.currentRoom.messages = payload.message;
      state.currentRoom.count = payload._count;
    },
  },
});

export const { joinRoom, setAvailableRooms, setMessages } = roomSlice.actions;
export default roomSlice.reducer;
