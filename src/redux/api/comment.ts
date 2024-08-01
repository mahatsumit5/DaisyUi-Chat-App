import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { rootApi } from "./serverUrl";
import { IComment, ICreateCommentParams } from "../../types";
import { postApi } from "./post";
const url = rootApi + "api/v1/comment";

export const commentApi = createApi({
  reducerPath: "commentApi",
  tagTypes: ["comment"],
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${sessionStorage.getItem("accessJWT") as string}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postComment: builder.mutation<IComment, ICreateCommentParams>({
      query: (data) => {
        return { url: "", body: data, method: "post" };
      },
      transformResponse: (response: { status: boolean; comment: IComment }) =>
        response.comment,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        try {
          dispatch(
            postApi.util.updateQueryData("getPosts", null, (draft) => {
              return draft.map((post) => {
                if (post.id === arg.postId) {
                  return { ...post, comments: [...post.comments, data] };
                }
                return post;
              });
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
