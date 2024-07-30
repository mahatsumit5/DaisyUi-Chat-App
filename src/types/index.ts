export interface IGetAllUsersParams {
  take: number;
  page: number;
  order: "asc" | "desc";
  search?: string;
}

export interface ISendReqParams {
  userId: string;
  email: string;
}
export interface IdeleteReqParams {
  fromId: string;
  toId: string;
  receiverId: string;
  type: "received" | "sent";
}

export interface IUser {
  id: string;
  fName: string;
  lName: string;
  profile: string | null;
  email: string;
  isActive: boolean;
}

export interface IMessage {
  id: string;
  content: string;
  createdAt: Date;
  isSeen: boolean;
  chatRoomId: string;
  author: string;
}
export interface Iroom extends IUser {
  messages: IMessage[];
  _count: number;
  userId: string;
}

export interface IChatRoom {
  id: string;
  userId: string;
  fName: string;
  lName: string;
  profile: string | null;
  email: string;
  isActive: boolean;
  lastMessage: string;
  isLastMessageSeen: boolean;
  lastmessageAuthor: string;
  unSeenMessageCount: number;
}

export interface IResponse {
  status: boolean;
  data: IFriendReq[] | IUser[];
}

export interface IError {
  status: boolean;
  message: string;
}

export interface ILogin {
  status: boolean;
  message: string;
  token: { accessJWT: string; refreshJWT: string };
}

export interface ISignUpParams {
  email: string;
  password: string;
  fName: string;
  lName: string;
}
export interface IMessageResponse {
  status: boolean;
  result: {
    messages: IMessage[];
    _count: { messages: number };
  };
}

export interface IAllUsersResponse {
  status: boolean;
  data: IUser[];
  totalUsers: number;
}

export interface IDeleteReqRes {
  status: boolean;
  data: IFriendReq;
  message: string;
}

export interface IFriendReq {
  status: string;
  from: {
    fName: string;
    lName: string;
    profile: string | null;
    email: string;
    id: string;
  };
  to: {
    fName: string;
    lName: string;
    profile: string | null;
    email: string;
    id: string;
  };
}

export interface IFriendReqRes {
  status: boolean;
  data: { result: IFriendReq[]; friendReqCount: number };
}
export interface IFriendReqAccRes {
  status: string;
  friendRequest: IFriendReq;
  data: {
    id: string;
  };
}

export interface ISentReq {
  status: boolean;
  data: IFriendReq[];
  count: number;
}
export interface ISendReqRes {
  status: boolean;
  data: IFriendReq;
}

export interface IGetNewAcessJWTResponse {
  status: boolean;
  data: string;
  message: string;
}

export interface IDelChatRoomRes {
  status: boolean;
  result: { id: string };
}
export interface IPost {
  id: string;
  title: string;
  content: string;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
  likes: string[];
  images: string[];
}
