import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IDeleteRequestResponse,
  IFriendReq,
  ISendRequestResponse,
  ISentReq,
} from "../../types";
import { friendApiUrl } from "./serverUrl";
import { socket } from "../reducer/socket.slice";

export const friendApi = createApi({
  reducerPath: "FriendApi",
  tagTypes: ["FriendRequests", "SentRequests"],
  baseQuery: fetchBaseQuery({
    baseUrl: friendApiUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        sessionStorage.getItem("accessJWT") as string
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    acceptFriendReq: builder.mutation<unknown, { fromId: string }>({
      query: (data) => ({
        url: "",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["FriendRequests"],
    }),
    getFriendRequest: builder.query<
      {
        status: boolean;
        data: { result: IFriendReq[]; friendReqCount: number };
      },
      null
    >({
      query: () => "friend-request",
      providesTags: ["FriendRequests"],
    }),

    getSentFriendRequest: builder.query<
      { status: boolean; data: ISentReq[] },
      null
    >({
      query: () => "sent-request",
    }),
    sendFriendRequest: builder.mutation<
      ISendRequestResponse,
      { userId: string; email: string }
    >({
      query: (data) => ({
        url: "/send-request",
        method: "POST",
        body: data,
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            friendApi.util.updateQueryData(
              "getSentFriendRequest",
              null,
              (draft) => {
                draft.data.push(data.data);
              }
            )
          );
          socket.emit("friend_request_notification", arg.userId, arg.email);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    deleteSentRequest: builder.mutation<
      IDeleteRequestResponse,
      { fromId: string; toId: string }
    >({
      query: (data) => ({
        method: "DELETE",
        url: `/${data.fromId}/${data.toId}`,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            friendApi.util.updateQueryData(
              "getSentFriendRequest",
              null,
              (draft) => {
                draft.data = draft.data.filter(
                  (item) => item.to.email !== data.data.to.email
                );
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
