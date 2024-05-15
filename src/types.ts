export interface IUser {
  id: string;
  fName: string;
  lName: string;
  profile: string | null;
  email: string;
  isActive: boolean;
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
  user: IUser[];
}
