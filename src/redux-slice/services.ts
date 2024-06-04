import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IChatRoom, IFriendReq, ISentReq } from "../types";
type chatroomReturnType = {
  status: boolean;
  data: IChatRoom[];
};
export const rootApi = !import.meta.env.PROD
  ? "http://localhost:8080"
  : "your server domain";

export const serverApi = createApi({
  reducerPath: "ServerApi",

  baseQuery: fetchBaseQuery({
    baseUrl: rootApi,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        sessionStorage.getItem("accessJWT") as string
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllChatRoom: builder.query<chatroomReturnType, null>({
      query: () => `api/v1/room`,
    }),
    acceptFriendReq: builder.mutation<unknown, { fromId: string }>({
      query: (data) => ({
        url: "/api/v1/friend",
        method: "PATCH",
        body: data,
      }),
    }),
    getFriendRequest: builder.query<
      { status: boolean; data: IFriendReq[] },
      null
    >({
      query: () => "api/v1/friend",
    }),

    getAllUsers: builder.query({
      query: () => "api/v1/user/all-users",
    }),

    getSentFriendRequest: builder.query<
      { status: boolean; data: ISentReq[] },
      null
    >({
      query: () => "/api/v1/friend/sent-request",
    }),
    sendFriendRequest: builder.mutation<unknown, { userId: string }>({
      query: (data) => ({
        url: "/api/v1/friend/send-request",
        method: "post",
        body: data,
      }),
    }),

    deleteSentRequest: builder.mutation<
      unknown,
      { fromId: string; toId: string }
    >({
      query: (data) => ({
        method: "delete",
        url: `/api/v1/friend/${data.fromId}/${data.toId}`,
      }),
    }),
  }),
});
export const {
  useGetAllChatRoomQuery,
  useAcceptFriendReqMutation,
  useGetFriendRequestQuery,
  useGetAllUsersQuery,
  useGetSentFriendRequestQuery,
  useSendFriendRequestMutation,
  useDeleteSentRequestMutation,
} = serverApi;
