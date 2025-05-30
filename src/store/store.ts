import { configureStore } from "@reduxjs/toolkit"

import {
  friendApi,
  userApi,
  roomApi,
  messageApi,
  postApi,
  roomReducer,
  userInfoReducer,
  allUsersreducer,
  friendReqReducer,
  dialogReducer,
  loaderReducer,
  socketReducer,
  paginationReducer,
  toastReducer,
  searchReducer,
  commentDrawerReducer,
  commentApi,
  postReducer,
  HomeMessageBox,
  viewImageReducer,
} from "../redux/api/index"
import { setupListeners } from "@reduxjs/toolkit/query"
import { rtkQueryErrorLogger } from "../utils/errorHandler"
import { baseApiWithGraphql } from "../graphql/baseApi"
import { baseApiWithRestAPI } from "../redux/api/restBaseApi"
export const store = configureStore({
  reducer: {
    messageBox: HomeMessageBox,
    post: postReducer,
    search: searchReducer,
    rooms: roomReducer,
    user: userInfoReducer,
    onlineUsers: allUsersreducer,
    friendRequest: friendReqReducer,
    dialog: dialogReducer,
    comment: commentDrawerReducer,
    loader: loaderReducer,
    socket: socketReducer,
    pagination: paginationReducer,
    toast: toastReducer,
    viewImgBox: viewImageReducer,
    [friendApi.reducerPath]: friendApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [baseApiWithRestAPI.reducerPath]: baseApiWithRestAPI.reducer,
    [baseApiWithGraphql.reducerPath]: baseApiWithGraphql.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      friendApi.middleware,
      userApi.middleware,
      roomApi.middleware,
      messageApi.middleware,
      postApi.middleware,
      commentApi.middleware,
      baseApiWithRestAPI.middleware,
      baseApiWithGraphql.middleware,
      rtkQueryErrorLogger,
    ]),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
