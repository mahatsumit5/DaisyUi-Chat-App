import { friendApi } from "./api/friend";
import { userApi } from "./api/user";
import { roomApi } from "./api/room";
import { messageApi } from "./api/message";
import { postApi } from "./api/post";
import { commentApi } from "./api/comment";
import commentDrawerReducer from "./reducer/comment.drawer";
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
import postReducer from "./reducer/post.slice";
import HomeMessageBox from "./reducer/HomeMessageBox";
export const {
  useAcceptFriendReqMutation,
  useGetFriendRequestQuery,
  useGetSentFriendRequestQuery,
  useSendFriendRequestMutation,
  useDeleteSentRequestMutation,
} = friendApi;
export const {
  usePostCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useGetCommentsQuery,
} = commentApi;
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
export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
  useRemoveLikeMutation,
} = postApi;
export {
  userApi,
  friendApi,
  roomApi,
  messageApi,
  postApi,
  commentApi,
  loaderReducer,
  dialogReducer,
  socketReducer,
  friendReqReducer,
  allUsersreducer,
  userInfoReducer,
  roomReducer,
  commentDrawerReducer,
  paginationReducer,
  toastReducer,
  searchReducer,
  HomeMessageBox,
  postReducer,
};
