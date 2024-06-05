import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./room.slice";
import userInfoReducer from "./user.slice";
import allUsersreducer from "./AllUsers.slice";
import friendReqReducer from "./friendReq.slice";
import dialogReducer from "./dialog.slice";
import { friendApi, userApi, roomApi } from "./api/index";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    user: userInfoReducer,
    allUsers: allUsersreducer,
    friendRequest: friendReqReducer,
    dialog: dialogReducer,
    [friendApi.reducerPath]: friendApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      friendApi.middleware,
      userApi.middleware,
      roomApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
