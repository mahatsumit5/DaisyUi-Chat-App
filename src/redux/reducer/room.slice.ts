import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChatRoom, IUser } from "../../types";

interface rooms {
  currentRoom: IChatRoom | null;
  chatRoom: IChatRoom[];
  currentUser: IUser | null;
}

const initialState: rooms = {
  currentRoom: null,
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

    setCurrentRoom: (state, { payload }: PayloadAction<IChatRoom | null>) => {
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

  setCurrentRoom,
  replaceLastMessageInSpecificRoom,
  setCurrentUser,
} = roomSlice.actions;
export default roomSlice.reducer;
