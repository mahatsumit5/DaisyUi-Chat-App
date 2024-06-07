import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./reducer/room.slice";
import userInfoReducer from "./reducer/user.slice";
import allUsersreducer from "./reducer/AllUsers.slice";
import friendReqReducer from "./reducer/friendReq.slice";
import socketReducer from "./reducer/socket.slice";
import dialogReducer from "./dialog.slice";
import { friendApi, userApi, roomApi, messageApi } from "./index";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    user: userInfoReducer,
    onlineUsers: allUsersreducer,
    friendRequest: friendReqReducer,
    dialog: dialogReducer,
    socket: socketReducer,
    [friendApi.reducerPath]: friendApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
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
