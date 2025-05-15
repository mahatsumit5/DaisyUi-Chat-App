import { api as generatedApi } from "../queries/comment.generated"
export const commentGraphqlApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Comment"],
  endpoints: {
    GetComments: {
      providesTags: ["Comment"],
    },
    CreateComment: {
      invalidatesTags: ["Comment"],
    },
    DeleteComment: {
      invalidatesTags: ["Comment"],
    },
  },
})
