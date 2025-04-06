import { baseApiWithGraphql as api } from "../../graphql/baseApi"

const fileUpload = api.injectEndpoints({
  overrideExisting: true,
  endpoints: build => ({
    uploadFile: build.mutation<any, { images: File[] }>({
      query: ({ images }) => {
        console.log(images)
        const formData = new FormData()

        if (images.length) {
          for (let index = 0; index < images.length; index++) {
            const element = images[index]
            formData.append("images", element)
          }
        }
        return {}
      },
    }),
  }),
})

export const { useUploadFileMutation } = fileUpload
