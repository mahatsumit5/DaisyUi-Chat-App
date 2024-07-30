import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { postApiUrl } from "./serverUrl";
import { IPost } from "../../types";

export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["post"],
  baseQuery: fetchBaseQuery({
    baseUrl: postApiUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${sessionStorage.getItem("accessJWT") as string}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPost: builder.mutation<
      { status: boolean; result: IPost },
      { title: string; content: string; id: string }
    >({
      query: (data) => {
        return { url: "", method: "post", body: data };
      },
      invalidatesTags: ["post"],
    }),
    getPosts: builder.query<IPost[], void>({
      providesTags: ["post"],
      query: () => "",
      transformResponse: ({ posts }: { status: boolean; posts: IPost[] }) => {
        return posts;
      },
    }),
  }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
});
