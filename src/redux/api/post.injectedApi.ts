import { baseApiWithRestAPI as api } from "./restBaseApi"

const injectedRtkApi = api.injectEndpoints({
  endpoints: builder => ({
    uploadFile: builder.mutation<string[], { images: File[] }>({
      query: ({ images }) => {
        const formData = new FormData()

        if (images.length) {
          for (let index = 0; index < images.length; index++) {
            const element = images[index]
            formData.append("images", element)
          }
        }
        return { url: "/post", method: "post", body: formData }
      },
    }),
  }),
})

const fileUploadApi = injectedRtkApi.enhanceEndpoints({
  endpoints: {
    uploadFile: {
      transformResponse(baseQueryReturnValue: {
        status: boolean
        message: string
        data: { location: string }[]
      }) {
        return baseQueryReturnValue.data.map(item => item.location)
      },
    },
  },
})
export { fileUploadApi as postEnhancedApi }
