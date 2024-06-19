import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { roomApiUrl } from "./serverUrl";
import { IChatRoom, IMessage } from "../../types";
import { socket } from "../reducer/socket.slice";
import { toggleDialog } from "../dialog.slice";

export type chatroomReturnType = {
  status: boolean;
  data: IChatRoom[];
};
export const roomApi = createApi({
  reducerPath: "roomApi",
  tagTypes: ["Rooms"],
  baseQuery: fetchBaseQuery({
    baseUrl: roomApiUrl,
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
      query: () => "",
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) => {
        try {
          const { data } = await cacheDataLoaded;
          const roomIds = data.data.map((item) => item.id);
          socket.emit("join-room", roomIds);

          socket.on("send_message_client", (data: IMessage) => {
            updateCachedData((draft) => {
              const roomIndex = draft.data.findIndex(
                (item) => item.id === data.chatRoomId
              );
              draft.data[roomIndex].lastMessage = data.content;
            });
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
      },
    }),
    deleteChatRoom: builder.mutation<
      { status: boolean; result: { id: string } },
      string
    >({
      query: (id) => ({
        url: `?id=${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          dispatch(
            roomApi.util.updateQueryData("getAllChatRoom", null, (draft) => {
              console.log(draft);
              draft.data = draft.data.filter(
                (item) => item.id !== data.result.id
              );
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
