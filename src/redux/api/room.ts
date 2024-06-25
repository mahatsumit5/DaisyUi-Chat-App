import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { roomApiUrl } from "./serverUrl";
import { IChatRoom, IDelChatRoomRes, IMessage } from "../../types";
import { socket } from "../reducer/socket.slice";
import { userApi } from "./user";
import { toggleLoader } from "../reducer/loader.slice";

export type chatroomReturnType = {
  status: boolean;
  data: IChatRoom[];
};

type GetChatRoomParams = {
  page: number;
  take: number;
  search: string;
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
    getAllChatRoom: builder.query<chatroomReturnType, GetChatRoomParams>({
      providesTags: ["Rooms"],
      query: ({ search, page, take }) =>
        "?search=" + search + "&page=" + page + "&take=" + take,

      onCacheEntryAdded: async (
        arg,
        { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData }
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

          socket.on("getDeletedChatRoom", (data) => {
            updateCachedData((draft) => {
              draft.data = draft.data.filter(
                (item) => item.id !== data.result.id
              );
            });

            dispatch(userApi.util.invalidateTags(["Users"]));
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    deleteChatRoom: builder.mutation<IDelChatRoomRes, string>({
      query: (id) => ({
        url: `?id=${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(
            toggleLoader({ isLoading: true, content: "Please Wait..." })
          );
          const { data } = await queryFulfilled;

          dispatch(
            roomApi.util.updateQueryData(
              "getAllChatRoom",
              { search: "", page: 1, take: 10 },
              (draft) => {
                draft.data = draft.data.filter(
                  (item) => item.id !== data.result.id
                );
              }
            )
          );
          dispatch(toggleLoader({ isLoading: false }));

          socket.emit("deleteChatRoom", data);
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }));

          console.log(error);
        }
      },
    }),
  }),
});
