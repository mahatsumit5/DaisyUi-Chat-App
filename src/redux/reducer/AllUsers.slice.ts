import { PayloadAction, createSlice } from "@reduxjs/toolkit"
const initialState = {
  onlineUsers: [] as string[],
}
const allUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setOnlineUsers: (
      state,
      { payload }: PayloadAction<string[] | undefined>
    ) => {
      if (!payload) {
        state.onlineUsers = []
        return
      }
      state.onlineUsers = payload
    },
  },
})
const { actions, reducer } = allUsersSlice

export default reducer
export const { setOnlineUsers } = actions
