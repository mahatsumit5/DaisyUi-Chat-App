import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types";

const initialState = {
  allUsers: [] as IUser[],
};
const allUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers: (state, { payload }: PayloadAction<IUser[]>) => {
      state.allUsers = payload;
    },
  },
});
const { actions, reducer } = allUsersSlice;

export default reducer;
export const { setAllUsers } = actions;
