import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFriendReq, ISentReq } from "../types";

interface initialState {
  sentReq: ISentReq[];
  friendReq: IFriendReq[];
}
const initialState: initialState = {
  sentReq: [],
  friendReq: [],
};
const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState,
  reducers: {
    setSentReq: (state, { payload }: PayloadAction<ISentReq[]>) => {
      state.sentReq = payload;
    },
    setFriendReq: (state, { payload }: PayloadAction<IFriendReq[]>) => {
      state.friendReq = payload;
    },
  },
});
const { actions, reducer } = friendRequestSlice;
export default reducer;
export const { setSentReq, setFriendReq } = actions;
