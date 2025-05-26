import { friendApi } from "./friend"
import { userApi } from "./user"
import { roomApi } from "./room"
import { messageApi } from "./message"
import { postApi } from "./post"
import { commentApi } from "./comment"
import commentDrawerReducer from "../reducer/comment.drawer"
import roomReducer from "../reducer/room.slice"
import userInfoReducer from "../reducer/user.slice"
import allUsersreducer from "../reducer/AllUsers.slice"
import friendReqReducer from "../reducer/friendReq.slice"
import socketReducer from "../reducer/socket.slice"
import dialogReducer from "../reducer/dialog.slice"
import toastReducer from "../reducer/toast.slice"
import loaderReducer from "../reducer/loader.slice"
import paginationReducer from "../reducer/pagination.slice"
import searchReducer from "../reducer/search.slice"
import postReducer from "../reducer/post.slice"
import viewImageReducer from "../reducer/ViewImg.slice"
import HomeMessageBox from "../reducer/HomeMessageBox"
import { userGraphqlApi } from "../../graphql/api/userGraphql.api"
import { postGraphqlApi } from "../../graphql/api/postGraphql.api"
import { userEnhancedApi } from "./user.injectedApi"
import { friendReqGraphqlApi } from "../../graphql/api/friendReqGraphql.api"
import { chatRoomGraphqlApi } from "../../graphql/api/chatRoomGraphql.api"
import { messageGraphqlApi } from "../../graphql/api/messageGraphql.api"
import { commentGraphqlApi } from "../../graphql/api/commentGraphql.api"
import { postEnhancedApi } from "./post.injectedApi"
export const {
  useAcceptFriendReqMutation,
  useGetSentFriendRequestQuery,
  useDeleteSentRequestMutation,
} = friendApi
export const {
  usePostCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} = commentApi
export const {
  useLogoutUserMutation,

  useGetLoggedInUserQuery,
  useGetNewAccessJWTMutation,
  useChangePasswordMutation,
  useUploadImageMutation,
} = userApi

export const { useGetAllChatRoomQuery, useDeleteChatRoomMutation } = roomApi

export const {
  useGetPostsQuery,
  useDeletePostMutation,
  useRemoveLikeMutation,
} = postApi
export const { useUploadFileMutation } = postEnhancedApi
export const { useLoginMutation, useSignUpUserMutation } = userEnhancedApi
export const {
  useLoggedInUserQuery,
  useLogoutMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useGetListOfFriendsQuery,
} = userGraphqlApi
export const {
  useSendFriendRequestMutation,
  useGetFriendRequestQuery,
  useAcceptFriendRequestMutation,
  useDeleteFriendReqMutation,
} = friendReqGraphqlApi
export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} = postGraphqlApi

export const { useGetAllChatRoomsQuery } = chatRoomGraphqlApi
export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
} = commentGraphqlApi
export const { useSendMessageMutation, useGetMessagesQuery } = messageGraphqlApi
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
  viewImageReducer,
}
