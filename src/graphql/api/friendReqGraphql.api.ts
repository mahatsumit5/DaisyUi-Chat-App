import { api as generatedApi } from "../queries/request.generated"
import { userGraphqlApi } from "./userGraphql.api"
export const friendReqGraphqlApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["FriendRequest", "SentFriendRequest"],
  endpoints: {
    SendFriendRequest: {
      onCacheEntryAdded: async (__, { cacheDataLoaded, cacheEntryRemoved }) => {
        try {
          await cacheDataLoaded
        } catch (error) {
          console.log(error)
        }
        await cacheEntryRemoved
      },

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          if (data.data?.status) {
            // 1st approach recall the data after the request is sent
            dispatch(userGraphqlApi.util.invalidateTags(["Users"]))
            dispatch(
              friendReqGraphqlApi.endpoints.GetSentFriendRequest.initiate({
                page: 1,
                search: "",
                take: 10,
              })
            )
            // 2nd approach simply remove the data that is sent from
            // the cache

            dispatch(
              friendReqGraphqlApi.util.updateQueryData(
                "GetSentFriendRequest",
                { page: 1, search: "", take: 10 },
                draft => {
                  return draft
                }
              )
            )
          }
        } catch (error) {
          console.log(error)
        }
      },
    },
    GetFriendRequest: {},
    GetSentFriendRequest: {
      providesTags: ["SentFriendRequest"],

      onCacheEntryAdded: async (__, { cacheDataLoaded, cacheEntryRemoved }) => {
        try {
          await cacheDataLoaded
        } catch (error) {
          console.log(error)
        }
        await cacheEntryRemoved
      },
    },
  },
})
