import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { rootApi } from "./serverUrl"
import {
  IComment,
  ICreateCommentParams,
  IDeleteCommentRes,
  ILikeCommentResponse,
  IUnlikeLikeCommentResponse,
} from "../../types"
import { postApi } from "./post"
const url = rootApi + "api/v1/comment"

export const commentApi = createApi({
  reducerPath: "commentApi",
  tagTypes: ["comment"],
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: headers => {
      headers.set(
        "Authorization",
        `Bearer ${sessionStorage.getItem("accessJWT") as string}`
      )
      return headers
    },
  }),
  endpoints: builder => ({
    getComments: builder.query<IComment[], string>({
      query: id => {
        return { url: id, method: "get" }
      },
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved }
      ) => {
        try {
          await cacheDataLoaded
        } catch (error) {
          console.log(error)
        }
        await cacheEntryRemoved
      },
    }),
    postComment: builder.mutation<IComment, ICreateCommentParams>({
      query: data => {
        return { url: "", body: data, method: "post" }
      },
      transformResponse: (response: { status: boolean; comment: IComment }) =>
        response.comment,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled
        try {
          dispatch(
            commentApi.util.updateQueryData(
              "getComments",
              arg.postId,
              draft => {
                draft.push(data)
              }
            )
          )

          // Todo Un comment and fix the issue below

          // dispatch(
          //   postApi.util.updateQueryData("getPosts", 0, (draft) => {
          //     return {
          //       ...draft,
          //       posts: draft.posts.map((post) => {
          //         if (post.id === arg.postId) {
          //           return {
          //             ...post,
          //             _count: {
          //               comments: post._count.comments + 1,
          //             },
          //           };
          //         } else {
          //           return post;
          //         }
          //       }),
          //     };
          //   })
          // );
        } catch (error) {
          console.log(error)
        }
      },
    }),
    deleteComment: builder.mutation<
      IDeleteCommentRes,
      { postId: string; commentId: string }
    >({
      query: ({ commentId }) => ({
        url: `delete-comment/${commentId}`,
        method: "delete",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(
            commentApi.util.updateQueryData(
              "getComments",
              arg.postId,
              draft => {
                return draft.filter(comment => comment.id !== arg.commentId)
              }
            )
          )
        } catch (error) {
          console.log(error)
        }
      },
    }),
    likeComment: builder.mutation<
      ILikeCommentResponse,
      { commentId: string; postId: string }
    >({
      query: ({ commentId }) => {
        return { url: "like-comment", body: { commentId }, method: "post" }
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(
            commentApi.util.updateQueryData(
              "getComments",
              arg.postId,
              draft => {
                return draft.map(comment => {
                  if (comment.id === arg.commentId) {
                    return {
                      ...comment,
                      likes: [...comment.likes, data.likedComment],
                    }
                  } else {
                    return comment
                  }
                })
              }
            )
          )
        } catch (error) {
          console.log(error)
        }
      },
    }),
    unlikeComment: builder.mutation<
      IUnlikeLikeCommentResponse,
      { commentId: string; postId: string }
    >({
      query: ({ commentId }) => {
        return { url: `unlike-comment/${commentId}`, method: "delete" }
      },

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(
            commentApi.util.updateQueryData(
              "getComments",
              arg.postId,
              draft => {
                return draft.map(comment => {
                  if (comment.id === arg.commentId) {
                    return {
                      ...comment,
                      likes: comment.likes.filter(
                        item => item.userId !== data.unlikedComment.userId
                      ),
                    }
                  } else {
                    return comment
                  }
                })
              }
            )
          )
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})
