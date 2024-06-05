import { friendApi } from "./friend";
import { userApi } from "./user";
import { roomApi } from "./room";
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
export { userApi, friendApi, roomApi };
