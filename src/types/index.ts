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

export interface IDeleteRequestResponse {
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

export interface IFriendRequestResponse {
  status: boolean;
  data: { result: IFriendReq[]; friendReqCount: number };
}
export interface IFriendRequestAccepted {
  status: string;
  friendRequest: IFriendReq;
  data: {
    id: string;
  };
}

export interface ISentReq {
  status: boolean;
  data: IFriendReq[];
}
export interface ISendRequestResponse {
  status: boolean;
  data: IFriendReq;
}
