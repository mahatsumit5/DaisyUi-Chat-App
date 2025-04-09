import { Order } from "../../types/types"
import { api as generatedApi } from "../queries/request.generated"
import { userGraphqlApi } from "./userGraphql.api"
export const friendReqGraphqlApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["FriendRequest"],
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
            dispatch(
              userGraphqlApi.endpoints.GetAllUsers.initiate({
                params: { order: Order.Asc, page: 1, search: "", take: 10 },
              })
            )
          }
        } catch (error) {
          console.log(error)
        }
      },
    },
  },
})
