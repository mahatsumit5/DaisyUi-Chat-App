import { api as generatedApi } from "../queries/message.generated"

export const messageGraphqlApi = generatedApi.enhanceEndpoints({
  endpoints: {
    SendMessage: {},
  },
})
