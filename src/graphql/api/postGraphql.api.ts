import {
  setTotalNumberOfPage,
  Type,
} from "../../redux/reducer/pagination.slice"
import { notification } from "../../utils/notification"
import { api as generatedApi } from "../queries/post.generated"
const postGraphqlApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Posts"],
  endpoints: {
    GetAllPosts: {
      providesTags: ["Posts"],
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
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled
        if (data.data?.status && data.data.posts != null) {
          const totalNumOfPosts = data.data.totalNumberOfPosts
          const maximumNumberOfPages = Math.ceil(totalNumOfPosts! / 10)
          dispatch(
            setTotalNumberOfPage({
              type: Type.Post,
              totalPages: maximumNumberOfPages,
            })
          )
        }
      },

      merge: (cacheData, incomingData) => {
        // console.log("this is cache data", cacheData)
        // console.log("this is incoming data", incomingData)
        if (
          incomingData?.data?.status &&
          Array.isArray(incomingData.data.posts)
        ) {
          if (!cacheData.data) {
            cacheData.data = { ...incomingData.data }
          } else if (!Array.isArray(cacheData.data.posts)) {
            cacheData.data.posts = [...incomingData.data.posts]
          } else {
            cacheData.data.posts.push(...incomingData.data.posts)
          }
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        // only refetch if page changes
        return currentArg?.args?.page !== previousArg?.args?.page
      },
    },
    CreatePost: {
      invalidatesTags: ["Posts"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(postGraphqlApi.util.invalidateTags(["Posts"]))
        } catch (error) {
          console.log(error)
        }
      },
    },
    UpdatePost: {
      invalidatesTags: ["Posts"],
    },
    LikePost: {
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(
            postGraphqlApi.util.updateQueryData(
              "GetAllPosts",
              { args: { page: 1, take: 10 } },
              draft => {
                if (draft.data?.posts != null) {
                  const postTochange = draft.data.posts.find(
                    post => post.id === data.likePost.likedPost
                  )
                  return {
                    ...draft,
                    data: {
                      ...draft.data,
                      posts: draft.data?.posts.map(post => {
                        if (
                          post.id === postTochange?.id &&
                          post._count != null
                        ) {
                          return {
                            ...post,
                            hasLiked: true,
                            _count: {
                              comments: post._count.comments,
                              likes: post._count.likes + 1,
                            },
                          }
                        } else {
                          return post
                        }
                      }),
                    },
                  }
                }
                return draft
              }
            )
          )
          notification.play()
        } catch (error) {
          console.log(error)
        }
      },
    },
    UnlikePost: {
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(
            postGraphqlApi.util.updateQueryData(
              "GetAllPosts",
              { args: { page: 1, take: 10 } },
              draft => {
                if (draft.data?.posts != null) {
                  const postTochange = draft.data.posts.find(
                    post => post.id === data.unlikePost.data
                  )
                  return {
                    ...draft,
                    data: {
                      ...draft.data,
                      posts: draft.data?.posts.map(post => {
                        if (
                          post.id === postTochange?.id &&
                          post._count != null
                        ) {
                          return {
                            ...post,
                            hasLiked: false,
                            _count: {
                              comments: post._count.comments,
                              likes: post._count.likes - 1,
                            },
                          }
                        } else {
                          return post
                        }
                      }),
                    },
                  }
                }
                return draft
              }
            )
          )
        } catch (error) {
          console.log(error)
        }
      },
    },
  },
})

export { postGraphqlApi }
