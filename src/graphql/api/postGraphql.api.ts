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

      merge: (cacheData, incomingData) => {
        if (cacheData.data?.posts && incomingData.data?.posts) {
          cacheData.data?.posts.push(...incomingData.data.posts)
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    },
  },
})

export { postGraphqlApi }
