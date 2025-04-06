export interface IGetAllUsersParams {
  take: number
  page: number
  order: "asc" | "desc"
  search?: string
}

export interface ServerResponse {
  status: boolean
  message: string
}

export interface ISendReqParams {
  userId: string
  email: string
}
export interface IdeleteReqParams {
  fromId: string
  toId: string
  receiverId: string
  type: "received" | "sent"
}

export type updataPostParams = {
  id: string
  title: string
  content: string
}

export interface IUser {
  id: string
  fName: string
  lName: string
  profile: string | null
  email: string
  isActive: boolean
}

export interface IMessage {
  id: string
  content: string
  createdAt: Date
  isSeen: boolean
  chatRoomId: string
  author: string
}
export interface Iroom extends IUser {
  messages: IMessage[]
  _count: number
  userId: string
}

export interface IChatRoom {
  id: string
  userId: string
  fName: string
  lName: string
  profile: string | null
  email: string
  isActive: boolean
  lastMessage: string
  isLastMessageSeen: boolean
  lastmessageAuthor: string
  unSeenMessageCount: number
}

export interface IResponse {
  status: boolean
  data: IFriendReq[] | IUser[]
}

export interface IError {
  status: boolean
  message: string
}

export interface ILogin {
  status: boolean
  message: string
  token: { accessJWT: string; refreshJWT: string }
}

export interface ICreateCommentParams {
  userId: string
  content: string
  postId: string
}
export interface createPostParams {
  title: string
  content: string
  id: string
  images: File[]
}
export interface ISignUpParams {
  email: string
  password: string
  fName: string
  lName: string
}
export interface ICreatePostRes {
  status: boolean
  result: IPost
}

export interface ILikePostResponse {
  status: boolean
  message: string
  likedPost: ILikedPost
}
export interface IRemovedLikeRes {
  status: boolean
  message: string
  deletedLike: ILikedPost
}
export interface IMessageResponse {
  status: boolean
  result: {
    messages: IMessage[]
    _count: { messages: number }
  }
}
export interface IDeletePost {
  status: boolean
  message: string
  post: IPost
}

export interface IAllUsersResponse {
  status: boolean
  data: IUser[]
  totalUsers: number
}

export interface IDeleteReqRes {
  status: boolean
  data: IFriendReq
  message: string
}

export interface IDeleteCommentRes extends ServerResponse {
  data: IComment
}
export interface ILikeCommentResponse extends ServerResponse {
  likedComment: {
    userId: string
  }
}
export interface IUnlikeLikeCommentResponse extends ServerResponse {
  unlikedComment: {
    userId: string
  }
}

export interface IFriendReq {
  status: string
  from: {
    fName: string
    lName: string
    profile: string | null
    email: string
    id: string
  }
  to: {
    fName: string
    lName: string
    profile: string | null
    email: string
    id: string
  }
}

export interface IFriendReqRes {
  status: boolean
  data: IFriendReq[]
  count: number
  message: string
}
export interface IFriendReqAccRes {
  status: string
  friendRequest: IFriendReq
  data: {
    id: string
  }
}

export interface ISentReq {
  status: boolean
  data: IFriendReq[]
  count: number
}
export interface ISendReqRes {
  status: boolean
  data: IFriendReq
}

export interface IGetNewAcessJWTResponse {
  status: boolean
  data: string
  message: string
}

export interface IDelChatRoomRes {
  status: boolean
  result: { id: string }
}
export interface IPost {
  id: string
  title: string
  content: string
  author: IUser
  createdAt: string
  updatedAt: string

  images: string[]
  _count: {
    comments: number
    likes: number
  }
  hasLiked: boolean
}

export interface IComment {
  id: string
  content: string
  postId: string
  authorId: string
  author: IUser
  createdAt: string
  updatedAt: string
  likes: {
    userId: string
  }[]
}
export interface ILikedPost {
  id: string
  postId: string
  userId: string
}
