import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";

interface initialState {
  user: IUser | null;
}

const initialState: initialState = {
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser | null>) => {
      state.user = payload;
    },
  },
});
const { actions, reducer } = userSlice;
export const { setUser } = actions;
export default reducer;
