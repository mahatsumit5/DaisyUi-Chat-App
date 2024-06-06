import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { messageApiUrl } from "./serverUrl";
import { IMessageResponse, IResponse } from "../../types";
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
    sendMessage: builder.mutation<IResponse, sendMessagePArams>({
      query: (data) => ({
        url: "",
        method: "post",
        body: data,
      }),
    }),

    getMessages: builder.query<
      IMessageResponse,
      { roomId: string; num: number }
    >({
      query: ({ roomId, num }) => `?id=${roomId}&&num=${num}`,
    }),
  }),
});
