import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChatRoom, IUser, Imessage, Iroom } from "../../types";

interface rooms {
  currentRoom: Iroom;
  chatRoom: IChatRoom[];
  currentUser: IUser | null;
}

const initialState: rooms = {
  currentRoom: {
    id: "",
    email: "",
    fName: "",
    isActive: false,
    lName: "",
    profile: "",
    messages: [],
    _count: 0,
    userId: "",
  },
  chatRoom: [],
  currentUser: null,
};

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setAvailableRooms: (state, { payload }: PayloadAction<IChatRoom[]>) => {
      state.chatRoom = payload;
    },
    setMessages: (
      state,
      { payload }: PayloadAction<{ messages: Imessage[]; _count: number }>
    ) => {
      state.currentRoom.messages = payload.messages;
      state.currentRoom._count = payload._count;
    },
    setCurrentRoom: (state, { payload }: PayloadAction<Iroom>) => {
      state.currentRoom = payload;
    },
    replaceLastMessageInSpecificRoom: (
      state,
      { payload }: PayloadAction<{ roomId: string; message: string }>
    ) => {
      const result = state.chatRoom.find((item) => item.id === payload.roomId);
      state.chatRoom = state.chatRoom.map((item) => {
        if (item.id === payload.roomId && result) {
          return {
            ...result,
            lastMessage: payload.message,
            isLastMessageSeen: false,
            unSeenMessageCount: item.unSeenMessageCount + 1,
          };
        } else {
          return item;
        }
      });
    },
    setCurrentUser: (state, { payload }: PayloadAction<IUser>) => {
      state.currentUser = payload;
    },
  },
});

export const {
  setAvailableRooms,
  setMessages,
  setCurrentRoom,
  replaceLastMessageInSpecificRoom,
  setCurrentUser,
} = roomSlice.actions;
export default roomSlice.reducer;
