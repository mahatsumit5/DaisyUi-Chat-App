import { api as generatedApi } from "../queries/chatRoom.generated"

const chatRoomGraphqlApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["ChatRoom"],
  endpoints: {
    GetAllChatRooms: {
      providesTags: ["ChatRoom"],
    },
  },
})

export { chatRoomGraphqlApi }
