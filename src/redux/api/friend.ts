import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFriendReq, IResponse, ISentReq } from "../../types";
import { friendApiUrl } from "./serverUrl";

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
      { status: boolean; data: IFriendReq[] },
      null
    >({
      query: () => "",
      providesTags: ["FriendRequests"],
    }),

    getSentFriendRequest: builder.query<
      { status: boolean; data: ISentReq[] },
      null
    >({
      query: () => "sent-request",
      providesTags: ["SentRequests"],
    }),
    sendFriendRequest: builder.mutation<unknown, { userId: string }>({
      query: (data) => ({
        url: "/send-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SentRequests"],
      transformResponse: (response: { data: IResponse }) => response.data,
    }),

    deleteSentRequest: builder.mutation<
      unknown,
      { fromId: string; toId: string }
    >({
      query: (data) => ({
        method: "DELETE",
        url: `/${data.fromId}/${data.toId}`,
      }),
      invalidatesTags: ["SentRequests"],
    }),
  }),
});
