import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IDeleteReqRes,
  IFriendReq,
  IFriendReqAccRes,
  IFriendReqRes,
  ISendReqParams,
  ISendReqRes,
  ISentReq,
  IdeleteReqParams,
} from "../../types";
import { friendApiUrl } from "./serverUrl";
import { socket } from "../reducer/socket.slice";
import { userApi } from "./user";
import { roomApi } from "./room";
import { toggleDialog } from "../reducer/dialog.slice";
import { toggleLoader } from "../reducer/loader.slice";

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
    acceptFriendReq: builder.mutation<IFriendReqAccRes, { fromId: string }>({
      query: (data) => ({
        url: "",
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async ({ fromId }, { dispatch, queryFulfilled }) => {
        try {
          dispatch(
            toggleLoader({ isLoading: true, content: "Please Wait..." })
          );
          const { data } = await queryFulfilled;
          dispatch(
            friendApi.util.updateQueryData(
              "getFriendRequest",
              null,
              (draft) => {
                draft.data.result = draft.data.result.filter(
                  (item) => item.from.email !== data.friendRequest.from.email
                );
              }
            )
          );
          dispatch(roomApi.util.invalidateTags(["Rooms"]));
          dispatch(toggleLoader({ isLoading: false }));
          socket.emit("friend_request_accepted", data.data.id, fromId);
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }));

          console.log(error);
        }
      },
    }),

    // get all the friends Request
    getFriendRequest: builder.query<IFriendReqRes, null>({
      query: () => "friend-request",
      providesTags: ["FriendRequests"],
      onCacheEntryAdded: async (
        arg,
        { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) => {
        try {
          // wait for inital query to load before procedding
          await cacheDataLoaded;

          socket.on("getFriendRequest", (data: IFriendReq) => {
            updateCachedData((draft) => {
              draft.data.friendReqCount = ++draft.data.friendReqCount;

              draft.data.result.push(data);
            });
            dispatch(
              toggleDialog({
                content: "You have a new incoming request.",
                heading: "Notification",
              })
            );
            // dispatch(userApi.util.invalidateTags(["Users"]));
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

          socket.on("getReqAcceptedNotification", (roomId) => {
            dispatch(userApi.util.invalidateTags(["Users"]));
            dispatch(roomApi.util.invalidateTags(["Rooms"]));
            socket.emit("join-room", roomId);
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
    sendFriendRequest: builder.mutation<ISendReqRes, ISendReqParams>({
      query: (data) => ({
        url: "/send-request",
        method: "POST",
        body: data,
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(
            toggleLoader({
              isLoading: true,
              content: "Your request is being sent. Please wait a moment.",
            })
          );
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
          dispatch(toggleLoader({ isLoading: false }));
          socket.emit("sendFriendRequest", data.data, arg.userId);
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }));

          console.log(error);
        }
      },
    }),

    // Cancel Friend Request by both user
    deleteSentRequest: builder.mutation<IDeleteReqRes, IdeleteReqParams>({
      query: (data) => ({
        method: "DELETE",
        url: `/${data.fromId}/${data.toId}`,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          if (!arg.fromId) return;

          dispatch(
            toggleLoader({
              isLoading: true,
              content: "Please wait while we delete your request.",
            })
          );
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

          dispatch(
            friendApi.util.updateQueryData(
              "getFriendRequest",
              null,
              (draft) => {
                draft.data.result = draft.data.result.filter(
                  (item) => item.from.email !== data.data.from.email
                );
                draft.data.friendReqCount = --draft.data.friendReqCount;
              }
            )
          );
          socket.emit("request_deleted", data.data, arg.receiverId);
          dispatch(toggleLoader({ isLoading: false }));
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }));

          console.log(error);
        }
      },
    }),
  }),
});
