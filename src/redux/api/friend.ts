import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IDeleteRequestResponse,
  IFriendReq,
  IFriendRequestAccepted,
  IFriendRequestResponse,
  ISendRequestResponse,
  ISentReq,
} from "../../types";
import { friendApiUrl } from "./serverUrl";
import { socket } from "../reducer/socket.slice";
import { userApi } from "./user";
import { roomApi } from "./room";

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
    // accept Friend Request
    acceptFriendReq: builder.mutation<
      IFriendRequestAccepted,
      { fromId: string }
    >({
      query: (data) => ({
        url: "",
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async ({ fromId }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(
            friendApi.util.updateQueryData(
              "getFriendRequest",
              null,
              (draft) => {
                draft.data.result = draft.data.result.filter(
                  (item) => item.from.email !== data.friendRequest.to.email
                );
              }
            )
          );
          socket.emit("friend_request_accepted", data.friendRequest, fromId);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // get all the friends Request
    getFriendRequest: builder.query<IFriendRequestResponse, null>({
      query: () => "friend-request",
      providesTags: ["FriendRequests"],
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) => {
        try {
          // wait for inital query to load before procedding
          await cacheDataLoaded;

          socket.on("getFriendRequest", (data: IFriendReq) => {
            updateCachedData((draft) => {
              draft.data.friendReqCount = ++draft.data.friendReqCount;

              draft.data.result.push(data);
            });
          });

          socket.on("getRequestDeleted", (data: IFriendReq) => {
            updateCachedData((draft) => {
              draft.data.friendReqCount = --draft.data.friendReqCount;
              draft.data.result = draft.data.result.filter(
                (item) => item.from.id !== data.from.id
              );
            });
          });

          // listen to the socket event
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),

    // get sent request  by the current logged in user
    getSentFriendRequest: builder.query<ISentReq, null>({
      query: () => "sent-request",
      onCacheEntryAdded: async (
        argument,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, updateCachedData }
      ) => {
        try {
          await cacheDataLoaded;

          socket.on("friend_req_accepted_notification", () => {
            dispatch(userApi.util.invalidateTags(["Users"]));
            dispatch(roomApi.util.invalidateTags(["Rooms"]));
          });
          socket.on("getRequestDeleted", (data: IFriendReq) => {
            updateCachedData((draft) => {
              draft.data = draft.data.filter(
                (item) => item.from.id !== data.from.id
              );
            });
          });
        } catch (error) {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),

    // send request to to other user
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
          socket.emit("sendFriendRequest", data.data, arg.userId);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // Cancel Friend Request by both user
    deleteSentRequest: builder.mutation<
      IDeleteRequestResponse,
      { fromId: string; toId: string; receiverId: string }
    >({
      query: (data) => ({
        method: "DELETE",
        url: `/${data.fromId}/${data.toId}`,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          if (!arg.fromId) return;
          const { data } = await queryFulfilled;
          console.log("data deleted", data);
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

          dispatch(
            friendApi.util.updateQueryData(
              "getFriendRequest",
              null,
              (draft) => {
                console.log(draft);
                draft.data.result = draft.data.result.filter(
                  (item) => item.from.email !== data.data.from.email
                );
              }
            )
          );
          socket.emit("request_deleted", data.data, arg.receiverId);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
