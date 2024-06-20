import { friendApi } from "./api/friend";
import { userApi } from "./api/user";
import { roomApi } from "./api/room";
import { messageApi } from "./api/message";

import roomReducer from "./reducer/room.slice";
import userInfoReducer from "./reducer/user.slice";
import allUsersreducer from "./reducer/AllUsers.slice";
import friendReqReducer from "./reducer/friendReq.slice";
import socketReducer from "./reducer/socket.slice";
import dialogReducer from "./dialog.slice";
import loaderReducer from "./loader.slice";
export const rootApi = !import.meta.env.PROD
  ? "http://localhost:8080"
  : "your server domain";
export const {
  useAcceptFriendReqMutation,
  useGetFriendRequestQuery,

  useGetSentFriendRequestQuery,
  useSendFriendRequestMutation,
  useDeleteSentRequestMutation,
} = friendApi;

export const {
  useGetAllUsersQuery,
  useLogoutUserMutation,
  useLoginMutation,
  useGetLoggedInUserQuery,
  useSignUpUserMutation,
  useGetNewAccessJWTMutation,
} = userApi;

export const { useGetAllChatRoomQuery, useDeleteChatRoomMutation } = roomApi;

export const { useSendMessageMutation, useGetMessagesQuery } = messageApi;
export {
  userApi,
  friendApi,
  roomApi,
  messageApi,
  loaderReducer,
  dialogReducer,
  socketReducer,
  friendReqReducer,
  allUsersreducer,
  userInfoReducer,
  roomReducer,
};
