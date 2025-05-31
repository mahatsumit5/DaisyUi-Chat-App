import { api as generatedApi } from "../queries/comment.generated"
export const commentGraphqlApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Comment"],
  endpoints: {
    GetComments: {
      providesTags: ["Comment"],
      // onCacheEntryAdded: async (
      //   arg,
      //   { cacheDataLoaded, cacheEntryRemoved }
      // ) => {
      //   try {
      //     await cacheDataLoaded
      //   } catch (error) {
      //     console.log(error)
      //   }
      //   await cacheEntryRemoved
      // },
    },
    CreateComment: {
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(
            commentGraphqlApi.util.updateQueryData(
              "GetComments",
              { postId: arg.postId },
              draft => {
                if (
                  draft.getComments &&
                  draft.getComments.data &&
                  data.createComment &&
                  data.createComment.data
                ) {
                  draft.getComments.data.push(data.createComment.data)
                  if (typeof draft.getComments.count === "number") {
                    draft.getComments.count += 1
                  } else {
                    draft.getComments.count = 1
                  }
                }
              }
            )
          )
        } catch (error) {
          console.log(error)
        }
      },
    },
    DeleteComment: {
      invalidatesTags: ["Comment"],
    },
  },
})
