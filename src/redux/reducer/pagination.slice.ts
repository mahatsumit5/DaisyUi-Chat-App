import { PayloadAction, createSlice } from "@reduxjs/toolkit"
export enum Type {
  Post = "post",
  User = "User",
}
type TinitialState = {
  post: {
    currentPage: number
    totalPages: number
    numOfPostPP: number
  }
  users: {
    currentPage: number
    totalPages: number
  }
}
type Payload = {
  type: Type
  currentPage: number
}
type Payload2 = {
  type: Type
  totalPages: number
}
const initialState: TinitialState = {
  post: {
    currentPage: 1,
    totalPages: 1,
    numOfPostPP: 10,
  },
  users: {
    currentPage: 1,
    totalPages: 1,
  },
}
const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }: PayloadAction<Payload>) => {
      const { currentPage, type } = payload
      switch (type) {
        case Type.Post:
          if (currentPage > state.post.totalPages) {
            break
          }
          state.post.currentPage = currentPage
          break
        case Type.User:
          state.users.currentPage = currentPage
          break
      }
    },
    setTotalNumberOfPage: (state, { payload }: PayloadAction<Payload2>) => {
      const { totalPages, type } = payload
      switch (type) {
        case Type.Post:
          state.post.totalPages = totalPages
          break
        case Type.User:
          state.users.totalPages = totalPages
          break
      }
    },
  },
})

export default paginationSlice.reducer
export const { setCurrentPage, setTotalNumberOfPage } = paginationSlice.actions
