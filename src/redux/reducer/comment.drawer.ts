import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { flipcard } from "../../utils/notification"
const flipcardSound = new Audio(flipcard)

const initialState = { isOpen: false, postId: "" }
const commentDrawerSlice = createSlice({
  name: "commentDrawer",
  initialState,
  reducers: {
    toggleCommentDrawer: (state, { payload }: PayloadAction<string>) => {
      state.isOpen = !state.isOpen
      state.postId = payload
      flipcardSound.play().catch(err => console.log(err))
    },
  },
})

const { actions, reducer } = commentDrawerSlice
export const { toggleCommentDrawer } = actions

export default reducer
