import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";

const initialState: IUser[] = [];
const allUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<IUser[]>) => {
      return (state = action.payload);
    },
  },
});
const { actions, reducer } = allUsersSlice;

export default reducer;
export const { setAllUsers } = actions;
