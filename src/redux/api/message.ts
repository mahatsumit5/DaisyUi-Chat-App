import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { messageApiUrl } from "./serverUrl";
import { IMessage, IMessageResponse } from "../../types";
type sendMessagePArams = {
  content: string;
  roomId: string;
  author: string;
};
export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: messageApiUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        sessionStorage.getItem("accessJWT") as string
      );
      return headers;
    },
  }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      { status: boolean; result: IMessage },
      sendMessagePArams
    >({
      query: (data) => ({
        url: "",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["Messages"],
    }),

    getMessages: builder.query<
      IMessageResponse,
      { roomId: string; num: number }
    >({
      query: ({ roomId, num }) => `?id=${roomId}&&num=${num}`,
      providesTags: ["Messages"],
    }),
  }),
  refetchOnMountOrArgChange: true,
});
