import { friendApi } from "./api/friend";
import { userApi } from "./api/user";
import { roomApi } from "./api/room";
import { messageApi } from "./api/message";
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

export const { useGetAllChatRoomQuery } = roomApi;

export const { useSendMessageMutation, useGetMessagesQuery } = messageApi;
export { userApi, friendApi, roomApi, messageApi };
