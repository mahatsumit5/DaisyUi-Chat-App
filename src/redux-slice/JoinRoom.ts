import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChatRoom, IUser } from "../types";

interface currentRoomid {
  _id: string;
  chatRoom: IChatRoom[];
  friends: IUser[];
}

const initialState: currentRoomid = {
  _id: "",
  chatRoom: [],
  friends: [],
};

export const roomSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    joinRoom: (state, { payload }: PayloadAction<string>) => {
      state._id = payload;
    },
    setAvailableRooms: (state, { payload }: PayloadAction<IChatRoom[]>) => {
      state.chatRoom = payload;
    },
    setFriends: (state, { payload }: PayloadAction<IUser[]>) => {
      state.friends = payload;
    },
  },
});

export const { joinRoom, setAvailableRooms, setFriends } = roomSlice.actions;
export default roomSlice.reducer;
