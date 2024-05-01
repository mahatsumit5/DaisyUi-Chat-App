import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./redux-slice/JoinRoom";
import userInfoReducer from "./redux-slice/user.slice";
import allUsersreducer from "./redux-slice/AllUsers.slice";
export const store = configureStore({
  reducer: {
    currentRoom: roomReducer,
    user: userInfoReducer,
    allUsers: allUsersreducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
