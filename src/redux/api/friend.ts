import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IDeleteReqRes,
  IFriendReq,
  IFriendReqAccRes,
  IFriendReqRes,
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
import { toggleToast } from "../reducer/toast.slice";

export const friendApi = createApi({
  reducerPath: "FriendApi",
  tagTypes: ["FriendRequests", "SentRequests"],
  baseQuery: fetchBaseQuery({
    baseUrl: friendApiUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${sessionStorage.getItem("accessJWT") as string}`
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
                type: "request",
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
    getSentFriendRequest: builder.query<
      ISentReq,
      { page?: number; search?: string } | null
    >({
      query: (data) =>
        `sent-request?take=7&&page=${data?.page}&&search=${data?.search}`,
      // tod make take dynamic
      providesTags: ["SentRequests"],
      onCacheEntryAdded: async (
        argument,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, updateCachedData }
      ) => {
        try {
          await cacheDataLoaded;
          socket.on("getReqAcceptedNotification", (roomId) => {
            console.log("new room crated", roomId);
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
    sendFriendRequest: builder.mutation<
      ISendReqRes,
      { to: string; page: number }
    >({
      query: (data) => ({
        url: "/send-request",
        method: "POST",
        body: { to: data.to },
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
              { search: "", page: 1 },
              (draft) => {
                draft.data = [...draft.data, data.data];
                draft.count = ++draft.count;
              },
              true
            )
          );
          dispatch(
            userApi.util.updateQueryData(
              "getAllUsers",
              { order: "asc", page: arg.page, take: 8, search: "" },
              (draft) => {
                // Filter out the user with the matching ID from getAllUsers data
                draft.data = draft.data.filter(
                  (user) => user.id !== data.data.to.id
                );
              },
              true
            )
          );
          dispatch(toggleLoader({ isLoading: false }));
          dispatch(
            toggleToast({
              isOpen: true,
              content: {
                id: Math.ceil(Math.random() * 10000000),
                message: "Your request has been sent",
                type: "error",
              },
            })
          );
          socket.emit("sendFriendRequest", data.data, arg.to);
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
              { search: "", page: 1 },
              (draft) => {
                draft.data = draft.data.filter(
                  (item) => item.to.id !== arg.toId
                );
                draft.count = --draft.count;
              },
              true
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
                draft.data.friendReqCount =
                  arg.type === "received"
                    ? --draft.data.friendReqCount
                    : draft.data.friendReqCount;
              }
            )
          );
          socket.emit("request_deleted", data.data, arg.receiverId);
          dispatch(toggleLoader({ isLoading: false }));

          dispatch(
            toggleToast({
              isOpen: true,
              content: {
                id: Math.ceil(Math.random() * 10000000),
                message: "Request deleted.",
                type: "info",
              },
            })
          );
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }));
          dispatch(
            toggleToast({
              isOpen: true,
              content: {
                id: Math.ceil(Math.random() * 10000000),
                message: "Unexpected error Occured.",
                type: "error",
              },
            })
          );
          console.log(error);
        }
      },
    }),
  }),
});
