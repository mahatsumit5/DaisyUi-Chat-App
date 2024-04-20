import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface currentRoomid {
  _id: string;
}

const initialState: currentRoomid = {
  _id: "",
};

export const roomSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    joinRoom: (state, { payload }: PayloadAction<string>) => {
      console.log(payload);
      state._id = payload;
    },
  },
});

export const { joinRoom } = roomSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default roomSlice.reducer;
