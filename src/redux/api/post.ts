import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { postApiUrl } from "./serverUrl";
import {
  createPostParams,
  ICreatePostRes,
  IDeletePost,
  ILikedPost,
  ILikePostResponse,
  IPost,
  IRemovedLikeRes,
  updataPostParams,
} from "../../types";
import { toggleLoader } from "../reducer/loader.slice";
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
    createPost: builder.mutation<ICreatePostRes, createPostParams>({
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            postApi.util.updateQueryData("getPosts", 0, (draft) => {
              return {
                totalNumberOfPosts: draft.totalNumberOfPosts + 1,
                posts: [data.result, ...draft.posts],
              };
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getPosts: builder.query<
      { posts: IPost[]; totalNumberOfPosts: number },
      number
    >({
      query: (page) => `?page=${page}&&take=10`,
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved }
      ) => {
        try {
          await cacheDataLoaded;
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      transformResponse: ({
        posts,
        totalNumberOfPosts,
      }: {
        status: boolean;
        posts: IPost[];
        totalNumberOfPosts: number;
      }) => ({ totalNumberOfPosts, posts }),
      merge: (cacheData, incomingData) => {
        cacheData.posts.push(...incomingData.posts);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    updatePost: builder.mutation<unknown, updataPostParams>({
      query: (data) => {
        return { url: "", method: "put", body: data };
      },
    }),
    deletePost: builder.mutation<IDeletePost, string>({
      query: (postId) => {
        return { url: `/${postId}`, method: "delete" };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(toggleLoader({ isLoading: true }));
          const { data } = await queryFulfilled;
          dispatch(
            postApi.util.updateQueryData("getPosts", 0, (draft) => {
              return {
                ...draft,
                posts: draft.posts.filter((post) => post.id !== data.post.id),
              };
            })
          );
          dispatch(toggleLoader({ isLoading: false }));
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }));

          console.log(error);
        }
      },
    }),
    likePost: builder.mutation<ILikedPost, string>({
      query: (postId) => {
        return { url: "like", method: "put", body: { postId } };
      },
      transformResponse: (res: ILikePostResponse) => res.likedPost,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            postApi.util.updateQueryData("getPosts", 0, (draft) => {
              return {
                ...draft,
                posts: draft.posts.map((post) => {
                  if (post.id === data.postId) {
                    return { ...post, likes: [...post.likes, data] };
                  } else {
                    return post;
                  }
                }),
              };
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    removeLike: builder.mutation<ILikedPost, string>({
      query: (likeId) => {
        return {
          url: `remove-like`,
          method: "put",
          body: { likeId },
        };
      },
      transformResponse: (res: IRemovedLikeRes) => res.deletedLike,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            postApi.util.updateQueryData("getPosts", 0, (draft) => {
              return {
                ...draft,
                posts: draft.posts.map((post) => {
                  if (post.id === data.postId) {
                    return {
                      ...post,
                      likes: post.likes.filter((like) => like.id !== data.id),
                    };
                  } else {
                    return post;
                  }
                }),
              };
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: true,
});
