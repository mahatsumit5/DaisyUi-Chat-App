import { api as generatedApi } from "../queries/chatRoom.generated"

const chatRoomGraphqlApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["ChatRoom"],
  endpoints: {
    GetAllChatRooms: {},
  },
})

export { chatRoomGraphqlApi }
