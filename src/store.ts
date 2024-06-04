import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./redux-slice/room.slice";
import userInfoReducer from "./redux-slice/user.slice";
import allUsersreducer from "./redux-slice/AllUsers.slice";
import friendReqReducer from "./redux-slice/friendReq.slice";
import dialogReducer from "./redux-slice/dialog.slice";
import { serverApi } from "./redux-slice/services";
export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    user: userInfoReducer,
    allUsers: allUsersreducer,
    friendRequest: friendReqReducer,
    dialog: dialogReducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
