import { gql, TypedDocumentNode } from "@apollo/client"
import { Subscription } from "../../types/types"

const NEW_MESSAGES_SUB: TypedDocumentNode<Subscription> = gql`
  subscription messageInARoom($roomId: ID!) {
    messageInRoom(roomId: $roomId) {
      id
      content
      createdAt
      isSeen
      chatRoomId
      author {
        id
        email
        fName
        lName
        isActive
        profile
        bio
        coverPicture
      }
      authorId
      groupChatId
    }
  }
`
const SUBS_TO_YOUR_MESSAGE: TypedDocumentNode<Subscription> = gql`
  subscription newMessageReceived($yourUserId: ID!) {
    newMessageReceived(yourUserId: $yourUserId) {
      id
      content
      createdAt
      isSeen
      chatRoomId
      author {
        id
        email
        fName
        lName
        isActive
        profile
        bio
        coverPicture
      }
      authorId
      groupChatId
    }
  }
`

const LIST_OF_ONLINE_USERS: TypedDocumentNode<Subscription> = gql`
  subscription onlineUsers {
    onlineUsers {
      id
      email
      fName
      lName
      isActive
      profile
      bio
      coverPicture
    }
  }
`
export { NEW_MESSAGES_SUB, SUBS_TO_YOUR_MESSAGE, LIST_OF_ONLINE_USERS }
