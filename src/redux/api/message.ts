import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { messageApiUrl } from "./serverUrl";
import { IMessage, IMessageResponse } from "../../types";
import { socket } from "../reducer/socket.slice";
import notificatioDing from "../../assets/notification_ding.mp3";
const notification = new Audio(notificatioDing);
type sendMessagePArams = {
  content: string | File;
  roomId: string;
  author: string;
};

type keys = "author" | "roomId" | "content";

// todo Implement
// const messageAdapter = createEntityAdapter<IMessage>();
export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: messageApiUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${sessionStorage.getItem("accessJWT") as string}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // send messages
    sendMessage: builder.mutation<
      { status: boolean; result: IMessage },
      sendMessagePArams
    >({
      query: (data) => {
        const formData = new FormData();
        for (const key in data) {
          const value = key as keys;
          formData.append(key, data[value]);
        }
        return { url: "", method: "post", body: formData };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            messageApi.util.updateQueryData(
              "getMessages",
              {
                num: 10,
                roomId: arg.roomId,
              },
              (draft) => {
                draft.result._count.messages = draft.result._count.messages + 1;
                draft.result.messages.push(data.result);
              }
            )
          );
        } catch (error) {
          // display error or do something else
          console.log(error);
        }
      },
    }),

    getMessages: builder.query<
      IMessageResponse,
      { roomId: string; num: number }
    >({
      query: ({ roomId, num }) => `?id=${roomId}&&num=${num}`,
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) => {
        try {
          // wait for initial query to resolve before proceeding

          await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          socket.on("send_message_client", (data: IMessage) => {
            if (data.chatRoomId !== arg.roomId) return;
            console.log(data);
            notification.play();
            updateCachedData((draft) => {
              draft.result.messages.push(data);
              // messageAdapter.updateOne(draft.result.messages, data);
            });
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),
  }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
});
