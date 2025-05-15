import { api as generatedApi } from "../queries/message.generated"

export const messageGraphqlApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Message"],
  endpoints: {
    SendMessage: {
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          console.log(data.sendMessage?.data)
          dispatch(
            messageGraphqlApi.util.updateQueryData(
              "GetMessages",
              { input: { roomId: arg.roomId, skip: 0, take: 10 } },
              draft => ({
                ...draft,
                getMessagesByRoomId: {
                  ...draft.getMessagesByRoomId!,
                  _count: draft.getMessagesByRoomId!._count,
                  data: draft.getMessagesByRoomId!.data.concat(
                    data.sendMessage?.data!
                  ),
                },
              })
            )
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
