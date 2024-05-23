export interface IUser {
  id: string;
  fName: string;
  lName: string;
  profile: string | null;
  email: string;
  isActive: boolean;
}
export interface Imessage {
  id: string;
  content: string;
  createdAt: Date;
  isSeen: boolean;
  chatRoomId: string;
  author: string;
}
export interface Iroom extends IUser {
  messages: Imessage[];
  _count: number;
  userId: string;
}
export interface ISentReq {
  status: string;
  to: {
    fName: string;
    lName: string;
    profile: string | null;
    email: string;
    id: string;
  };
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
