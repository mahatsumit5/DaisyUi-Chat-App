import { configureStore } from "@reduxjs/toolkit";

import {
  friendApi,
  userApi,
  roomApi,
  messageApi,
  roomReducer,
  userInfoReducer,
  allUsersreducer,
  friendReqReducer,
  dialogReducer,
  loaderReducer,
  socketReducer,
  paginationReducer,
  toastReducer,
} from "./index";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    user: userInfoReducer,
    onlineUsers: allUsersreducer,
    friendRequest: friendReqReducer,
    dialog: dialogReducer,
    loader: loaderReducer,
    socket: socketReducer,
    pagination: paginationReducer,
    toast: toastReducer,
    [friendApi.reducerPath]: friendApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      friendApi.middleware,
      userApi.middleware,
      roomApi.middleware,
      messageApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
