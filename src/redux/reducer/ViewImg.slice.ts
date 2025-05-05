import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPost } from "../../types"

type TinitialState = {
  isOpen: boolean
  post: IPost | null
}
const initialState = {
  isOpen: false,
  post: null,
} as TinitialState
const ViewImgSlice = createSlice({
  name: "ViewImg",
  initialState,
  reducers: {
    setPostToDisplay: (state, action: PayloadAction<IPost>) => {
      state.post = action.payload
      state.isOpen = true
    },
    closeImgBox(state) {
      state.isOpen = false
      state.post = null
    },
  },
})
export const { setPostToDisplay, closeImgBox } = ViewImgSlice.actions
export default ViewImgSlice.reducer
