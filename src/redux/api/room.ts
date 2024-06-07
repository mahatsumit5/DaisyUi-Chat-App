import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { roomApiUrl } from "./serverUrl";
import { IChatRoom } from "../../types";

type chatroomReturnType = {
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
    getAllChatRoom: builder.query<chatroomReturnType, void>({
      query: () => "",
    }),
    deleteChatRoom: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
