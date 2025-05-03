import {
  setTotalNumberOfPage,
  Type,
} from "../../redux/reducer/pagination.slice"
import { api as generatedApi } from "../queries/post.generated"
const postGraphqlApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Posts"],
  endpoints: {
    GetAllPosts: {
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
      serializeQueryArgs: ({ endpointName }) => {
        console.log(endpointName)
        return endpointName
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
    },
    UpdatePost: {
      invalidatesTags: ["Posts"],
    },
  },
})

export { postGraphqlApi }
