/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  user: Array<User>;
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

export type DeleteRequestParams = {
  fromId: Scalars['String']['input'];
  toId: Scalars['String']['input'];
};

export type Friend = {
  __typename?: 'Friend';
  email: Scalars['String']['output'];
  fName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lName: Scalars['String']['output'];
  profile?: Maybe<Scalars['String']['output']>;
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  from: Friend;
  status: Status;
  to: Friend;
  toId: Scalars['String']['output'];
};

export type FriendRequestResponse = {
  __typename?: 'FriendRequestResponse';
  count?: Maybe<Scalars['Int']['output']>;
  data: Array<FriendRequest>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type FriendRequests = {
  __typename?: 'FriendRequests';
  from: User;
  fromId: Scalars['String']['output'];
  status: Status;
  to: User;
  toId: Scalars['String']['output'];
};

export type GetAllPostsResponse = {
  __typename?: 'GetAllPostsResponse';
  message: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
  status: Scalars['Boolean']['output'];
  totalNumberOfPosts?: Maybe<Scalars['Int']['output']>;
};

export type GetMessageByUser = {
  roomId: Scalars['String']['input'];
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type GetMessageByUserResponse = {
  __typename?: 'GetMessageByUserResponse';
  message: Scalars['String']['output'];
  result: Array<Message>;
  status: Scalars['Boolean']['output'];
};

export type GetPostByUserIdResponse = {
  __typename?: 'GetPostByUserIdResponse';
  message: Scalars['String']['output'];
  posts?: Maybe<Post>;
  status: Scalars['Boolean']['output'];
};

export type LogInResponse = {
  __typename?: 'LogInResponse';
  data?: Maybe<User>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type Message = {
  __typename?: 'Message';
  author: Scalars['String']['output'];
  chat: ChatRoom;
  chatRoomId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  creatorId: User;
  id: Scalars['ID']['output'];
  isSeen: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accept incoming request */
  acceptFriendRequest?: Maybe<Response>;
  /** Delete Friend Request */
  deleteFriendRequest?: Maybe<SentRequestResponse>;
  deleteMessage?: Maybe<Response>;
  deletePost: GetPostByUserIdResponse;
  likePost: GetPostByUserIdResponse;
  logout?: Maybe<Response>;
  newJwt?: Maybe<Response>;
  resetPassword?: Maybe<Response>;
  sendMessage?: Maybe<SendMessageResponse>;
  /** Send friend request to other user */
  sendRequest?: Maybe<SentRequestResponse>;
  /** login to your account */
  signIn?: Maybe<SignInResponse>;
  /** Create a new user */
  signUp?: Maybe<Response>;
  unlikePost: GetPostByUserIdResponse;
  updateUser?: Maybe<Response>;
  uploadPost: UploadAPostResponse;
  uploadProfile?: Maybe<Response>;
};


export type MutationAcceptFriendRequestArgs = {
  body?: InputMaybe<DeleteRequestParams>;
};


export type MutationDeleteFriendRequestArgs = {
  params?: InputMaybe<DeleteRequestParams>;
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


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  input?: InputMaybe<SendMessageParams>;
};


export type MutationSendRequestArgs = {
  toID: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  input?: InputMaybe<SignInUser>;
};


export type MutationSignUpArgs = {
  input?: InputMaybe<SignUpUser>;
};


export type MutationUnlikePostArgs = {
  postId: Scalars['String']['input'];
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
  id: Scalars['String']['input'];
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
  /** a list of all the users */
  allUsers?: Maybe<AllUsersResponse>;
  getAllPosts?: Maybe<GetAllPostsResponse>;
  /** Get all incoming request */
  getFriendRequest?: Maybe<FriendRequestResponse>;
  getMessagesByUsers?: Maybe<GetMessageByUserResponse>;
  getPostByUserId?: Maybe<GetPostByUserIdResponse>;
  /** Get list of ALL SENT request */
  getSentFriendRequest?: Maybe<FriendRequestResponse>;
  /** a list of all the users */
  loggedInUser?: Maybe<LogInResponse>;
};


export type QueryAllUsersArgs = {
  params?: InputMaybe<AllUser>;
};


export type QueryGetAllPostsArgs = {
  page: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryGetMessagesByUsersArgs = {
  input?: InputMaybe<GetMessageByUser>;
};


export type QueryGetPostByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetSentFriendRequestArgs = {
  queryParams?: InputMaybe<QueryParamsSentReq>;
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type SendMessageParams = {
  author: Scalars['String']['input'];
  content: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};

export type SendMessageResponse = {
  __typename?: 'SendMessageResponse';
  message: Scalars['String']['output'];
  result?: Maybe<Message>;
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

export type SignInResponse = {
  __typename?: 'SignInResponse';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  token?: Maybe<Token>;
};

export type SignInUser = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpUser = {
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
  newPost?: Maybe<Post>;
};

export type Token = {
  __typename?: 'Token';
  accessJWT: Scalars['String']['output'];
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
  chatRoom: Array<ChatRoom>;
  comment: Array<Comment>;
  coverPicture?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  fName: Scalars['String']['output'];
  friendRequests: Array<FriendRequests>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lName: Scalars['String']['output'];
  likedComments: Array<CommentLikes>;
  likedPosts: Array<PostLike>;
  messages: Array<Message>;
  password: Scalars['String']['output'];
  post: Array<Post>;
  profile?: Maybe<Scalars['String']['output']>;
  sentRequests: Array<FriendRequests>;
  session: Array<Session>;
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

export type QueryParamsSentReq = {
  page: Scalars['Int']['input'];
  search: Scalars['String']['input'];
  take: Scalars['Int']['input'];
};

export type MutationMutationVariables = Exact<{
  body?: InputMaybe<PostInput>;
}>;


export type MutationMutation = { __typename?: 'Mutation', uploadPost: { __typename?: 'UploadAPostResponse', status: boolean, message: string, result?: { __typename?: 'Post', createdAt: string, title: string, id: string, content: string, author?: { __typename?: 'User', id: string, email: string, fName: string, lName: string, profile?: string | null } | null } | null } };


export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PostInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"profile"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;