import { friendApi } from "./api/friend";
import { userApi } from "./api/user";
import { roomApi } from "./api/room";
import { messageApi } from "./api/message";

import roomReducer from "./reducer/room.slice";
import userInfoReducer from "./reducer/user.slice";
import allUsersreducer from "./reducer/AllUsers.slice";
import friendReqReducer from "./reducer/friendReq.slice";
import socketReducer from "./reducer/socket.slice";
import dialogReducer from "./reducer/dialog.slice";
import toastReducer from "./reducer/toast.slice";
import loaderReducer from "./reducer/loader.slice";
import paginationReducer from "./reducer/pagination.slice";
import searchReducer from "./reducer/search.slice";

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
  useChangePasswordMutation,
  useUploadImageMutation,
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
  paginationReducer,
  toastReducer,
  searchReducer,
};
