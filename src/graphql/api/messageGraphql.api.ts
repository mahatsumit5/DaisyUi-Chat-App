import { api as generatedApi } from "../queries/message.generated"

export const messageGraphqlApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Message"],
  endpoints: {
    SendMessage: {
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(
            messageGraphqlApi.endpoints.GetMessages.initiate({
              input: {
                roomId: arg.roomId,
                skip: 0,
                take: 20,
              },
            })
          )
        } catch (error) {
          console.log(error)
        }
      },
      onCacheEntryAdded: async (__, { cacheDataLoaded, cacheEntryRemoved }) => {
        try {
          await cacheDataLoaded
        } catch (error) {
          console.log(error)
        }
        await cacheEntryRemoved
      },
    },
    GetMessages: {
      providesTags: ["Message"],

      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved }
      ) => {
        try {
          // wait for initial query to resolve before proceeding

          await cacheDataLoaded
        } catch (error) {
          console.log(error)
        }
        await cacheEntryRemoved
      },
    },
  },
})
