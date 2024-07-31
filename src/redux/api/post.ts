import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { postApiUrl } from "./serverUrl";
import { IPost } from "../../types";
type keys = "title" | "id" | "content" | "images";

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
      {
        title: string;
        content: string;
        id: string;
        images: FileList | undefined;
      }
    >({
      query: (data) => {
        const formData = new FormData();
        for (const key in data) {
          const value = key as keys;
          if (value !== "images") formData.append(key, data[value]);
        }
        if (data.images) {
          for (let index = 0; index < data.images.length; index++) {
            const element = data.images[index];
            formData.append("images", element);
          }
        }

        return { url: "", method: "post", body: formData };
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
