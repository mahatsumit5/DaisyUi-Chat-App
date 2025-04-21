import { Order } from "../../types/types"
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
          if (data.sendRequest?.status) {
            // Update sent request after seding the request without calling the api
            dispatch(
              friendReqGraphqlApi.util.updateQueryData(
                "GetSentFriendRequest",
                { page: 1, search: "", take: 10 },
                draft => {
                  if (draft.getSentFriendRequest) {
                    draft.getSentFriendRequest.count = ++draft
                      .getSentFriendRequest.count!
                    draft.getSentFriendRequest.data = [
                      ...draft.getSentFriendRequest.data!,
                      data.sendRequest?.data!,
                    ]
                  }
                }
              )
            )

            // Removing users from the list after the list is sent
            dispatch(
              userGraphqlApi.util.updateQueryData(
                "GetAllUsers",
                {
                  params: {
                    order: Order.Asc,
                    page: 1,
                    take: 8,
                    search: "",
                  },
                },
                draft => {
                  if (draft?.allUsers?.data) {
                    draft.allUsers.data = draft.allUsers.data
                      .filter(user => user.id !== arg.toId)
                      .filter(
                        (user): user is NonNullable<typeof user> =>
                          user !== undefined
                      )
                  }
                },
                true
              )
            )

            dispatch(
              userGraphqlApi.endpoints.GetAllUsers.initiate({
                params: {
                  order: Order.Asc,
                  page: 1,
                  take: 8,
                  search: "",
                },
              })
            )
          }
        } catch (error) {
          console.log(error)
        }
      },
    },
    GetFriendRequest: {
      providesTags: ["FriendRequest"],

      onCacheEntryAdded: async (__, { cacheDataLoaded, cacheEntryRemoved }) => {
        try {
          await cacheDataLoaded
        } catch (error) {
          console.log(error)
        }
        await cacheEntryRemoved
      },
    },
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
    DeleteFriendReq: {
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded
        } catch (error) {
          console.log(error)
        }
        await cacheEntryRemoved
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          // Remove deleted friend request from the list wihout calling the api
          dispatch(
            friendReqGraphqlApi.util.updateQueryData(
              "GetSentFriendRequest",
              { page: 1, search: "", take: 10 },
              draft => {
                if (draft?.getSentFriendRequest) {
                  draft.getSentFriendRequest.count = --draft
                    .getSentFriendRequest.count!
                  draft.getSentFriendRequest.data =
                    draft.getSentFriendRequest.data!.filter(
                      request => request.to.id !== arg.toId
                    )
                } else {
                  return draft
                }
              },
              true
            )
          )

          // Removing users from the list after the list is sent
          dispatch(
            userGraphqlApi.util.updateQueryData(
              "GetAllUsers",
              {
                params: {
                  order: Order.Asc,
                  page: 1,
                  take: 8,
                  search: "",
                },
              },
              draft => {
                if (draft?.allUsers?.data) {
                  draft.allUsers.data = [
                    data.deleteFriendRequest?.data?.to,
                    ...draft.allUsers.data,
                  ].filter(
                    (user): user is NonNullable<typeof user> =>
                      user !== undefined
                  )
                }
              },
              true
            )
          )
        } catch (error) {
          console.log(error)
        }
      },
      // invalidatesTags: ["SentFriendRequest"],
    },
    AcceptFriendRequest: {
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          console.log(data)
        } catch (error) {
          console.log(error)
        }
      },
      invalidatesTags: ["FriendRequest"],
    },
  },
})
