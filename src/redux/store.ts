import { configureStore } from "@reduxjs/toolkit";

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
} from "./index";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rtkQueryErrorLogger } from "../utils/errorHandler";
export const store = configureStore({
  reducer: {
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
    [friendApi.reducerPath]: friendApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      friendApi.middleware,
      userApi.middleware,
      roomApi.middleware,
      messageApi.middleware,
      postApi.middleware,
      commentApi.middleware,
      rtkQueryErrorLogger,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
