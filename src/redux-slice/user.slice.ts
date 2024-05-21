import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";

interface initialState {
  user: IUser | undefined;
}

const initialState: initialState = {
  user: undefined,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
  },
});
const { actions, reducer } = userSlice;
export const { setUser } = actions;
export default reducer;
