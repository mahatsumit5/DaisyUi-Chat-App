import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = import.meta.env.VITE_ROOTSERVER;
export const friendApiUrl = rootApi + "api/v1/friend/";
export const roomApiUrl = rootApi + "api/v1/room/";
export const messageApiUrl = rootApi + "api/v1/message/";

export const emptySplitApi = createApi({
  reducerPath: "emptySplitApi",
  tagTypes: ["Users", "CurrentUser", "FriendRequests", "SentRequests", "Rooms"],
  baseQuery: fetchBaseQuery({
    baseUrl: rootApi,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        sessionStorage.getItem("accessJWT") as string
      );
      return headers;
    },
    credentials: "include",

    // timeout: 10000, // request timeouts after 10 seconds
  }),
  endpoints: () => ({}),
  //   refetchOnMountOrArgChange: true,
  //   refetchOnReconnect: true,
});
