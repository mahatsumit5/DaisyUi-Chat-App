export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AllUsersResponse = {
  __typename?: 'AllUsersResponse';
  data?: Maybe<Array<Friend>>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  totalUsers?: Maybe<Scalars['Int']['output']>;
};

export type ChatRoom = {
  __typename?: 'ChatRoom';
  email: Scalars['String']['output'];
  fName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isLastMessageSeen: Scalars['Boolean']['output'];
  lName: Scalars['String']['output'];
  lastMessage?: Maybe<Scalars['String']['output']>;
  lastmessageAuthor: Scalars['String']['output'];
  profile?: Maybe<Scalars['String']['output']>;
  unSeenMessageCount: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likes: Array<CommentLikes>;
  post: Post;
  postId: Scalars['String']['output'];
  replies: Array<CommentReply>;
  updatedAt: Scalars['String']['output'];
};

export type CommentLikes = {
  __typename?: 'CommentLikes';
  comment: Comment;
  commentId: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type CommentReply = {
  __typename?: 'CommentReply';
  reply: Comment;
  replyId: Scalars['String']['output'];
};

export type CreateChatRoomResponse = {
  __typename?: 'CreateChatRoomResponse';
  data?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
};

export type Friend = {
  __typename?: 'Friend';
  email: Scalars['String']['output'];
  fName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lName: Scalars['String']['output'];
  profile?: Maybe<Scalars['String']['output']>;
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  from: Friend;
  status: Status;
  to: Friend;
};

export type FriendRequestResponse = {
  __typename?: 'FriendRequestResponse';
  count: Scalars['Int']['output'];
  data: Array<FriendRequest>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type GetAllPostArgs = {
  page: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type GetAllPostResponse = {
  __typename?: 'GetAllPostResponse';
  message: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
  status: Scalars['Boolean']['output'];
  totalNumberOfPosts?: Maybe<Scalars['Int']['output']>;
};

export type GetChatRoomResponse = {
  __typename?: 'GetChatRoomResponse';
  data: Array<ChatRoom>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type GetMessageByRoomResponse = {
  __typename?: 'GetMessageByRoomResponse';
  _count?: Maybe<Scalars['Int']['output']>;
  data: Array<Message>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type GetPostByUserIdResponse = {
  __typename?: 'GetPostByUserIdResponse';
  message: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
  status: Scalars['Boolean']['output'];
};

export type LoggedInUserResponse = {
  __typename?: 'LoggedInUserResponse';
  data?: Maybe<User>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type Message = {
  __typename?: 'Message';
  author: User;
  authorId: Scalars['String']['output'];
  chatRoomId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  groupChatId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isSeen: Scalars['Boolean']['output'];
};

export type MessageByRoomIdParams = {
  roomId: Scalars['String']['input'];
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept incoming request */
  acceptFriendRequest?: Maybe<CreateChatRoomResponse>;
  /** Delete Friend Request */
  deleteFriendRequest?: Maybe<SentRequestResponse>;
  deleteMessage?: Maybe<Response>;
  deletePost: GetPostByUserIdResponse;
  likePost: GetPostByUserIdResponse;
  logout?: Maybe<Response>;
  sendMessage?: Maybe<SendMessageResponse>;
  /** Send friend request to other user */
  sendRequest?: Maybe<SentRequestResponse>;
  unlikePost: GetPostByUserIdResponse;
  updatePost?: Maybe<UploadAPostResponse>;
  updateUser?: Maybe<UpdateUserResponse>;
  uploadPost: UploadAPostResponse;
};


export type MutationAcceptFriendRequestArgs = {
  fromId: Scalars['String']['input'];
  toId: Scalars['String']['input'];
};


export type MutationDeleteFriendRequestArgs = {
  fromId: Scalars['String']['input'];
  toId: Scalars['String']['input'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationLikePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  author: Scalars['String']['input'];
  content: Scalars['String']['input'];
  receiverId: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};


export type MutationSendRequestArgs = {
  toId: Scalars['String']['input'];
};


export type MutationUnlikePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  fName?: InputMaybe<Scalars['String']['input']>;
  lName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUploadPostArgs = {
  body?: InputMaybe<PostInput>;
};

export enum Order {
  Asc = 'asc',
  Desc = 'desc'
}

export type Post = {
  __typename?: 'Post';
  _count?: Maybe<_Count>;
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  hasLiked: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PostInput = {
  content: Scalars['String']['input'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
};

export type PostLike = {
  __typename?: 'PostLike';
  id: Scalars['ID']['output'];
  post: Post;
  postId: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** a list of all the friends */
  allFriends?: Maybe<AllUsersResponse>;
  /** a list of all the users */
  allUsers?: Maybe<AllUsersResponse>;
  getAllChatRooms: GetChatRoomResponse;
  getAllPosts?: Maybe<GetAllPostResponse>;
  getChatRoomById: ChatRoom;
  /** Get all incoming request */
  getFriendRequest?: Maybe<FriendRequestResponse>;
  getMessagesByRoomId?: Maybe<GetMessageByRoomResponse>;
  getPostByUserId?: Maybe<GetPostByUserIdResponse>;
  /** Get list of ALL SENT request */
  getSentFriendRequest?: Maybe<FriendRequestResponse>;
  /** a list of all the users */
  loggedInUser?: Maybe<LoggedInUserResponse>;
};


export type QueryAllUsersArgs = {
  params?: InputMaybe<AllUser>;
};


export type QueryGetAllChatRoomsArgs = {
  contains?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllPostsArgs = {
  args?: InputMaybe<GetAllPostArgs>;
};


export type QueryGetChatRoomByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMessagesByRoomIdArgs = {
  input?: InputMaybe<MessageByRoomIdParams>;
};


export type QueryGetPostByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetSentFriendRequestArgs = {
  page: Scalars['Int']['input'];
  search: Scalars['String']['input'];
  take: Scalars['Int']['input'];
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type SendMessageResponse = {
  __typename?: 'SendMessageResponse';
  data?: Maybe<Message>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type SentRequestResponse = {
  __typename?: 'SentRequestResponse';
  data?: Maybe<FriendRequest>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type Session = {
  __typename?: 'Session';
  associate: User;
  timeStamps: Scalars['String']['output'];
  token: Scalars['String']['output'];
  userEmail: Scalars['String']['output'];
};

export type SignUpUserParams = {
  email: Scalars['String']['input'];
  fName: Scalars['String']['input'];
  lName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum Status {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Subscription = {
  __typename?: 'Subscription';
  messageInRoom?: Maybe<Message>;
  newMessageReceived?: Maybe<Message>;
  newPost?: Maybe<Post>;
};


export type SubscriptionMessageInRoomArgs = {
  roomId: Scalars['ID']['input'];
};


export type SubscriptionNewMessageReceivedArgs = {
  yourUserId: Scalars['ID']['input'];
};

export type UpdateUserResponse = {
  __typename?: 'UpdateUserResponse';
  data?: Maybe<User>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type UploadAPostResponse = {
  __typename?: 'UploadAPostResponse';
  message: Scalars['String']['output'];
  result?: Maybe<Post>;
  status: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  coverPicture?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  fName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lName: Scalars['String']['output'];
  profile?: Maybe<Scalars['String']['output']>;
};

export type _Count = {
  __typename?: '_count';
  comments: Scalars['Int']['output'];
  likes: Scalars['Int']['output'];
};

export type AllUser = {
  order: Order;
  page: Scalars['Int']['input'];
  search: Scalars['String']['input'];
  take: Scalars['Int']['input'];
};

export type GetAllChatRoomsQueryVariables = Exact<{
  contains?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllChatRoomsQuery = { __typename?: 'Query', getAllChatRooms: { __typename?: 'GetChatRoomResponse', status: boolean, message: string, data: Array<{ __typename?: 'ChatRoom', id: string, userId: string, fName: string, lName: string, profile?: string | null, email: string, isActive: boolean, lastMessage?: string | null, isLastMessageSeen: boolean, lastmessageAuthor: string, unSeenMessageCount: number }> } };

export type SendMessageMutationVariables = Exact<{
  content: Scalars['String']['input'];
  author: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
  receiverId: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'SendMessageResponse', status: boolean, message: string, data?: { __typename?: 'Message', id: string, content: string, createdAt: string, isSeen: boolean, chatRoomId: string, authorId: string, groupChatId?: string | null, author: { __typename?: 'User', email: string, fName: string, lName: string, isActive: boolean, profile?: string | null } } | null } | null };

export type GetMessagesQueryVariables = Exact<{
  input?: InputMaybe<MessageByRoomIdParams>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessagesByRoomId?: { __typename?: 'GetMessageByRoomResponse', status: boolean, message: string, _count?: number | null, data: Array<{ __typename?: 'Message', id: string, content: string, createdAt: string, isSeen: boolean, chatRoomId: string, authorId: string, groupChatId?: string | null, author: { __typename?: 'User', id: string, email: string, fName: string, lName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null } }> } | null };

export type GetAllPostsQueryVariables = Exact<{
  args?: InputMaybe<GetAllPostArgs>;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', data?: { __typename?: 'GetAllPostResponse', status: boolean, message: string, totalNumberOfPosts?: number | null, posts?: Array<{ __typename?: 'Post', id: string, title: string, content: string, createdAt: string, updatedAt: string, images: Array<string>, hasLiked: boolean, author?: { __typename?: 'User', id: string, email: string, fName: string, lName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null } | null, _count?: { __typename?: '_count', comments: number, likes: number } | null }> | null } | null };

export type CreatePostMutationVariables = Exact<{
  body?: InputMaybe<PostInput>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', uploadPost: { __typename?: 'UploadAPostResponse', status: boolean, message: string, result?: { __typename?: 'Post', id: string, title: string, content: string, createdAt: string, updatedAt: string, images: Array<string>, author?: { __typename?: 'User', id: string, email: string, fName: string, lName: string, profile?: string | null, coverPicture?: string | null, bio?: string | null, isActive: boolean } | null, _count?: { __typename?: '_count', comments: number } | null } | null } };

export type UpdatePostMutationVariables = Exact<{
  updatePostId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', data?: { __typename?: 'UploadAPostResponse', status: boolean, message: string, result?: { __typename?: 'Post', id: string, images: Array<string>, title: string, updatedAt: string, createdAt: string, content: string } | null } | null };

export type SendFriendRequestMutationVariables = Exact<{
  toId: Scalars['String']['input'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendRequest?: { __typename?: 'SentRequestResponse', status: boolean, message: string, data?: { __typename?: 'FriendRequest', status: Status, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } } | null } | null };

export type GetFriendRequestQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendRequestQuery = { __typename?: 'Query', data?: { __typename?: 'FriendRequestResponse', status: boolean, message: string, count: number, data: Array<{ __typename?: 'FriendRequest', status: Status, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } }> } | null };

export type GetSentFriendRequestQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  search: Scalars['String']['input'];
}>;


export type GetSentFriendRequestQuery = { __typename?: 'Query', getSentFriendRequest?: { __typename?: 'FriendRequestResponse', status: boolean, message: string, count: number, data: Array<{ __typename?: 'FriendRequest', status: Status, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } }> } | null };

export type DeleteFriendReqMutationVariables = Exact<{
  fromId: Scalars['String']['input'];
  toId: Scalars['String']['input'];
}>;


export type DeleteFriendReqMutation = { __typename?: 'Mutation', deleteFriendRequest?: { __typename?: 'SentRequestResponse', status: boolean, message: string, data?: { __typename?: 'FriendRequest', status: Status, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } } | null } | null };

export type AcceptFriendRequestMutationVariables = Exact<{
  fromId: Scalars['String']['input'];
  toId: Scalars['String']['input'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest?: { __typename?: 'CreateChatRoomResponse', status: boolean, message: string, data?: string | null } | null };

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', data?: { __typename?: 'LoggedInUserResponse', message: string, status: boolean, data?: { __typename?: 'User', bio?: string | null, coverPicture?: string | null, email: string, id: string, fName: string, lName: string, isActive: boolean, profile?: string | null } | null } | null };

export type LogoutMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', data?: { __typename?: 'Response', status: boolean, message: string } | null };

export type GetAllUsersQueryVariables = Exact<{
  params?: InputMaybe<AllUser>;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', allUsers?: { __typename?: 'AllUsersResponse', status: boolean, message: string, totalUsers?: number | null, data?: Array<{ __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }> | null } | null };

export type UpdateUserMutationVariables = Exact<{
  password?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', data?: { __typename?: 'UpdateUserResponse', status: boolean, message: string, data?: { __typename?: 'User', id: string, email: string, fName: string, lName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null } | null } | null };

export type GetListOfFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfFriendsQuery = { __typename?: 'Query', allFriends?: { __typename?: 'AllUsersResponse', status: boolean, message: string, data?: Array<{ __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }> | null } | null };
