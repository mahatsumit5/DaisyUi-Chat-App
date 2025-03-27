import { GraphQLResolveInfo } from "graphql"
import { baseApiWithGraphql } from "./baseApi"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
    }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type AllUsersResponse = {
  __typename?: "AllUsersResponse"
  data?: Maybe<Array<Friend>>
  message: Scalars["String"]["output"]
  status: Scalars["Boolean"]["output"]
  totalUsers?: Maybe<Scalars["Int"]["output"]>
}

export type ChatRoom = {
  __typename?: "ChatRoom"
  id: Scalars["ID"]["output"]
  messages: Array<Message>
  user: Array<User>
}

export type Comment = {
  __typename?: "Comment"
  author: User
  authorId: Scalars["String"]["output"]
  content: Scalars["String"]["output"]
  createdAt: Scalars["String"]["output"]
  id: Scalars["ID"]["output"]
  likes: Array<CommentLikes>
  post: Post
  postId: Scalars["String"]["output"]
  replies: Array<CommentReply>
  updatedAt: Scalars["String"]["output"]
}

export type CommentLikes = {
  __typename?: "CommentLikes"
  comment: Comment
  commentId: Scalars["String"]["output"]
  user: User
  userId: Scalars["String"]["output"]
}

export type CommentReply = {
  __typename?: "CommentReply"
  reply: Comment
  replyId: Scalars["String"]["output"]
}

export type DeleteRequestParams = {
  fromId: Scalars["String"]["input"]
  toId: Scalars["String"]["input"]
}

export type Friend = {
  __typename?: "Friend"
  email: Scalars["String"]["output"]
  fName: Scalars["String"]["output"]
  id: Scalars["ID"]["output"]
  lName: Scalars["String"]["output"]
  profile?: Maybe<Scalars["String"]["output"]>
}

export type FriendRequest = {
  __typename?: "FriendRequest"
  from: Friend
  status: Status
  to: Friend
  toId: Scalars["String"]["output"]
}

export type FriendRequestResponse = {
  __typename?: "FriendRequestResponse"
  count?: Maybe<Scalars["Int"]["output"]>
  data: Array<FriendRequest>
  message: Scalars["String"]["output"]
  status: Scalars["Boolean"]["output"]
}

export type FriendRequests = {
  __typename?: "FriendRequests"
  from: User
  fromId: Scalars["String"]["output"]
  status: Status
  to: User
  toId: Scalars["String"]["output"]
}

export type GetAllPostsQuery = {
  __typename?: "GetAllPostsQuery"
  message: Scalars["String"]["output"]
  posts?: Maybe<Array<Post>>
  status: Scalars["Boolean"]["output"]
  totalNumberOfPosts?: Maybe<Scalars["Int"]["output"]>
}

export type GetAllPostsQueryVariables = {
  page: Scalars["Int"]["input"]
  take: Scalars["Int"]["input"]
}

export type GetMessageByUser = {
  roomId: Scalars["String"]["input"]
  skip: Scalars["Int"]["input"]
  take: Scalars["Int"]["input"]
}

export type GetMessageByUserResponse = {
  __typename?: "GetMessageByUserResponse"
  message: Scalars["String"]["output"]
  result: Array<Message>
  status: Scalars["Boolean"]["output"]
}

export type GetPostByUserIdResponse = {
  __typename?: "GetPostByUserIdResponse"
  message: Scalars["String"]["output"]
  posts?: Maybe<Post>
  status: Scalars["Boolean"]["output"]
}

export type LogInResponse = {
  __typename?: "LogInResponse"
  data?: Maybe<User>
  message: Scalars["String"]["output"]
  status: Scalars["Boolean"]["output"]
}

export type Message = {
  __typename?: "Message"
  author: Scalars["String"]["output"]
  chat: ChatRoom
  chatRoomId: Scalars["String"]["output"]
  content: Scalars["String"]["output"]
  createdAt: Scalars["String"]["output"]
  creatorId: User
  id: Scalars["ID"]["output"]
  isSeen: Scalars["Boolean"]["output"]
}

export type Mutation = {
  __typename?: "Mutation"
  /** Accept incoming request */
  acceptFriendRequest?: Maybe<Response>
  /** Delete Friend Request */
  deleteFriendRequest?: Maybe<SentRequestResponse>
  deleteMessage?: Maybe<Response>
  deletePost: GetPostByUserIdResponse
  likePost: GetPostByUserIdResponse
  logout?: Maybe<Response>
  newJwt?: Maybe<Response>
  resetPassword?: Maybe<Response>
  sendMessage?: Maybe<SendMessageResponse>
  /** Send friend request to other user */
  sendRequest?: Maybe<SentRequestResponse>
  /** login to your account */
  signIn?: Maybe<SignInMutation>
  /** Create a new user */
  signUp?: Maybe<Response>
  unlikePost: GetPostByUserIdResponse
  updateUser?: Maybe<Response>
  uploadPost: UploadAPostResponse
  uploadProfile?: Maybe<Response>
}

export type MutationAcceptFriendRequestArgs = {
  body?: InputMaybe<DeleteRequestParams>
}

export type MutationDeleteFriendRequestArgs = {
  params?: InputMaybe<DeleteRequestParams>
}

export type MutationDeleteMessageArgs = {
  messageId: Scalars["String"]["input"]
}

export type MutationDeletePostArgs = {
  id: Scalars["String"]["input"]
}

export type MutationLikePostArgs = {
  postId: Scalars["String"]["input"]
}

export type MutationResetPasswordArgs = {
  newPassword: Scalars["String"]["input"]
}

export type MutationSendMessageArgs = {
  input?: InputMaybe<SendMessageParams>
}

export type MutationSendRequestArgs = {
  toID: Scalars["String"]["input"]
}

export type MutationSignInArgs = {
  input?: InputMaybe<SignInMutationVariables>
}

export type MutationSignUpArgs = {
  input?: InputMaybe<SignUpUser>
}

export type MutationUnlikePostArgs = {
  postId: Scalars["String"]["input"]
}

export type MutationUploadPostArgs = {
  body?: InputMaybe<PostInput>
}

export enum Order {
  Asc = "asc",
  Desc = "desc",
}

export type Post = {
  __typename?: "Post"
  _count?: Maybe<_Count>
  author?: Maybe<User>
  content: Scalars["String"]["output"]
  createdAt: Scalars["String"]["output"]
  hasLiked: Scalars["Boolean"]["output"]
  id: Scalars["ID"]["output"]
  images: Array<Scalars["String"]["output"]>
  title: Scalars["String"]["output"]
  updatedAt: Scalars["String"]["output"]
}

export type PostInput = {
  content: Scalars["String"]["input"]
  id: Scalars["String"]["input"]
  images?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>
  title: Scalars["String"]["input"]
}

export type PostLike = {
  __typename?: "PostLike"
  id: Scalars["ID"]["output"]
  post: Post
  postId: Scalars["String"]["output"]
  user: User
  userId: Scalars["String"]["output"]
}

export type Query = {
  __typename?: "Query"
  /** a list of all the users */
  allUsers?: Maybe<AllUsersResponse>
  getAllPosts?: Maybe<GetAllPostsQuery>
  /** Get all incoming request */
  getFriendRequest?: Maybe<FriendRequestResponse>
  getMessagesByUsers?: Maybe<GetMessageByUserResponse>
  getPostByUserId?: Maybe<GetPostByUserIdResponse>
  /** Get list of ALL SENT request */
  getSentFriendRequest?: Maybe<FriendRequestResponse>
  /** a list of all the users */
  loggedInUser?: Maybe<LogInResponse>
}

export type QueryAllUsersArgs = {
  params?: InputMaybe<AllUser>
}

export type QueryGetAllPostsArgs = {
  args?: InputMaybe<GetAllPostsQueryVariables>
}

export type QueryGetMessagesByUsersArgs = {
  input?: InputMaybe<GetMessageByUser>
}

export type QueryGetPostByUserIdArgs = {
  userId: Scalars["String"]["input"]
}

export type QueryGetSentFriendRequestArgs = {
  queryParams?: InputMaybe<QueryParamsSentReq>
}

export type Response = {
  __typename?: "Response"
  message: Scalars["String"]["output"]
  status: Scalars["Boolean"]["output"]
}

export type SendMessageParams = {
  author: Scalars["String"]["input"]
  content: Scalars["String"]["input"]
  roomId: Scalars["String"]["input"]
}

export type SendMessageResponse = {
  __typename?: "SendMessageResponse"
  message: Scalars["String"]["output"]
  result?: Maybe<Message>
  status: Scalars["Boolean"]["output"]
}

export type SentRequestResponse = {
  __typename?: "SentRequestResponse"
  data?: Maybe<FriendRequest>
  message: Scalars["String"]["output"]
  status: Scalars["Boolean"]["output"]
}

export type Session = {
  __typename?: "Session"
  associate: User
  timeStamps: Scalars["String"]["output"]
  token: Scalars["String"]["output"]
  userEmail: Scalars["String"]["output"]
}

export type SignInMutation = {
  __typename?: "SignInMutation"
  message: Scalars["String"]["output"]
  status: Scalars["Boolean"]["output"]
  token?: Maybe<Token>
}

export type SignInMutationVariables = {
  email: Scalars["String"]["input"]
  password: Scalars["String"]["input"]
}

export type SignUpUser = {
  email: Scalars["String"]["input"]
  fName: Scalars["String"]["input"]
  lName: Scalars["String"]["input"]
  password: Scalars["String"]["input"]
}

export enum Status {
  Accepted = "ACCEPTED",
  Pending = "PENDING",
  Rejected = "REJECTED",
}

export type Subscription = {
  __typename?: "Subscription"
  newPost?: Maybe<Post>
}

export type Token = {
  __typename?: "Token"
  accessJWT: Scalars["String"]["output"]
}

export type UploadAPostResponse = {
  __typename?: "UploadAPostResponse"
  message: Scalars["String"]["output"]
  result?: Maybe<Post>
  status: Scalars["Boolean"]["output"]
}

export type User = {
  __typename?: "User"
  bio?: Maybe<Scalars["String"]["output"]>
  chatRoom: Array<ChatRoom>
  comment: Array<Comment>
  coverPicture?: Maybe<Scalars["String"]["output"]>
  email: Scalars["String"]["output"]
  fName: Scalars["String"]["output"]
  friendRequests: Array<FriendRequests>
  id: Scalars["ID"]["output"]
  isActive: Scalars["Boolean"]["output"]
  lName: Scalars["String"]["output"]
  likedComments: Array<CommentLikes>
  likedPosts: Array<PostLike>
  messages: Array<Message>
  password: Scalars["String"]["output"]
  post: Array<Post>
  profile?: Maybe<Scalars["String"]["output"]>
  sentRequests: Array<FriendRequests>
  session: Array<Session>
}

export type _Count = {
  __typename?: "_count"
  comments: Scalars["Int"]["output"]
  likes: Scalars["Int"]["output"]
}

export type AllUser = {
  order: Order
  page: Scalars["Int"]["input"]
  search: Scalars["String"]["input"]
  take: Scalars["Int"]["input"]
}

export type QueryParamsSentReq = {
  page: Scalars["Int"]["input"]
  search: Scalars["String"]["input"]
  take: Scalars["Int"]["input"]
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AllUsersResponse: ResolverTypeWrapper<AllUsersResponse>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>
  ChatRoom: ResolverTypeWrapper<ChatRoom>
  Comment: ResolverTypeWrapper<Comment>
  CommentLikes: ResolverTypeWrapper<CommentLikes>
  CommentReply: ResolverTypeWrapper<CommentReply>
  DeleteRequestParams: DeleteRequestParams
  Friend: ResolverTypeWrapper<Friend>
  FriendRequest: ResolverTypeWrapper<FriendRequest>
  FriendRequestResponse: ResolverTypeWrapper<FriendRequestResponse>
  FriendRequests: ResolverTypeWrapper<FriendRequests>
  GetAllPostsQuery: ResolverTypeWrapper<GetAllPostsQuery>
  GetAllPostsQueryVariables: GetAllPostsQueryVariables
  GetMessageByUser: GetMessageByUser
  GetMessageByUserResponse: ResolverTypeWrapper<GetMessageByUserResponse>
  GetPostByUserIdResponse: ResolverTypeWrapper<GetPostByUserIdResponse>
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>
  LogInResponse: ResolverTypeWrapper<LogInResponse>
  Message: ResolverTypeWrapper<Message>
  Mutation: ResolverTypeWrapper<{}>
  Order: Order
  Post: ResolverTypeWrapper<Post>
  PostInput: PostInput
  PostLike: ResolverTypeWrapper<PostLike>
  Query: ResolverTypeWrapper<{}>
  Response: ResolverTypeWrapper<Response>
  SendMessageParams: SendMessageParams
  SendMessageResponse: ResolverTypeWrapper<SendMessageResponse>
  SentRequestResponse: ResolverTypeWrapper<SentRequestResponse>
  Session: ResolverTypeWrapper<Session>
  SignInMutation: ResolverTypeWrapper<SignInMutation>
  SignInMutationVariables: SignInMutationVariables
  SignUpUser: SignUpUser
  Status: Status
  String: ResolverTypeWrapper<Scalars["String"]["output"]>
  Subscription: ResolverTypeWrapper<{}>
  Token: ResolverTypeWrapper<Token>
  UploadAPostResponse: ResolverTypeWrapper<UploadAPostResponse>
  User: ResolverTypeWrapper<User>
  _count: ResolverTypeWrapper<_Count>
  allUser: AllUser
  queryParamsSentReq: QueryParamsSentReq
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AllUsersResponse: AllUsersResponse
  Boolean: Scalars["Boolean"]["output"]
  ChatRoom: ChatRoom
  Comment: Comment
  CommentLikes: CommentLikes
  CommentReply: CommentReply
  DeleteRequestParams: DeleteRequestParams
  Friend: Friend
  FriendRequest: FriendRequest
  FriendRequestResponse: FriendRequestResponse
  FriendRequests: FriendRequests
  GetAllPostsQuery: GetAllPostsQuery
  GetAllPostsQueryVariables: GetAllPostsQueryVariables
  GetMessageByUser: GetMessageByUser
  GetMessageByUserResponse: GetMessageByUserResponse
  GetPostByUserIdResponse: GetPostByUserIdResponse
  ID: Scalars["ID"]["output"]
  Int: Scalars["Int"]["output"]
  LogInResponse: LogInResponse
  Message: Message
  Mutation: {}
  Post: Post
  PostInput: PostInput
  PostLike: PostLike
  Query: {}
  Response: Response
  SendMessageParams: SendMessageParams
  SendMessageResponse: SendMessageResponse
  SentRequestResponse: SentRequestResponse
  Session: Session
  SignInMutation: SignInMutation
  SignInMutationVariables: SignInMutationVariables
  SignUpUser: SignUpUser
  String: Scalars["String"]["output"]
  Subscription: {}
  Token: Token
  UploadAPostResponse: UploadAPostResponse
  User: User
  _count: _Count
  allUser: AllUser
  queryParamsSentReq: QueryParamsSentReq
}

export type AllUsersResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AllUsersResponse"] = ResolversParentTypes["AllUsersResponse"]
> = {
  data?: Resolver<
    Maybe<Array<ResolversTypes["Friend"]>>,
    ParentType,
    ContextType
  >
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  status?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  totalUsers?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ChatRoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ChatRoom"] = ResolversParentTypes["ChatRoom"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  messages?: Resolver<Array<ResolversTypes["Message"]>, ParentType, ContextType>
  user?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]
> = {
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  authorId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  likes?: Resolver<
    Array<ResolversTypes["CommentLikes"]>,
    ParentType,
    ContextType
  >
  post?: Resolver<ResolversTypes["Post"], ParentType, ContextType>
  postId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  replies?: Resolver<
    Array<ResolversTypes["CommentReply"]>,
    ParentType,
    ContextType
  >
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CommentLikesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommentLikes"] = ResolversParentTypes["CommentLikes"]
> = {
  comment?: Resolver<ResolversTypes["Comment"], ParentType, ContextType>
  commentId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CommentReplyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommentReply"] = ResolversParentTypes["CommentReply"]
> = {
  reply?: Resolver<ResolversTypes["Comment"], ParentType, ContextType>
  replyId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FriendResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Friend"] = ResolversParentTypes["Friend"]
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  fName?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  lName?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  profile?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FriendRequestResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FriendRequest"] = ResolversParentTypes["FriendRequest"]
> = {
  from?: Resolver<ResolversTypes["Friend"], ParentType, ContextType>
  status?: Resolver<ResolversTypes["Status"], ParentType, ContextType>
  to?: Resolver<ResolversTypes["Friend"], ParentType, ContextType>
  toId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FriendRequestResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FriendRequestResponse"] = ResolversParentTypes["FriendRequestResponse"]
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>
  data?: Resolver<
    Array<ResolversTypes["FriendRequest"]>,
    ParentType,
    ContextType
  >
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  status?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FriendRequestsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FriendRequests"] = ResolversParentTypes["FriendRequests"]
> = {
  from?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  fromId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  status?: Resolver<ResolversTypes["Status"], ParentType, ContextType>
  to?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  toId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetAllPostsQueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GetAllPostsQuery"] = ResolversParentTypes["GetAllPostsQuery"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  posts?: Resolver<
    Maybe<Array<ResolversTypes["Post"]>>,
    ParentType,
    ContextType
  >
  status?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  totalNumberOfPosts?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetMessageByUserResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GetMessageByUserResponse"] = ResolversParentTypes["GetMessageByUserResponse"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  result?: Resolver<Array<ResolversTypes["Message"]>, ParentType, ContextType>
  status?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetPostByUserIdResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GetPostByUserIdResponse"] = ResolversParentTypes["GetPostByUserIdResponse"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  posts?: Resolver<Maybe<ResolversTypes["Post"]>, ParentType, ContextType>
  status?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LogInResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LogInResponse"] = ResolversParentTypes["LogInResponse"]
> = {
  data?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  status?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Message"] = ResolversParentTypes["Message"]
> = {
  author?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  chat?: Resolver<ResolversTypes["ChatRoom"], ParentType, ContextType>
  chatRoomId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  creatorId?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isSeen?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  acceptFriendRequest?: Resolver<
    Maybe<ResolversTypes["Response"]>,
    ParentType,
    ContextType,
    Partial<MutationAcceptFriendRequestArgs>
  >
  deleteFriendRequest?: Resolver<
    Maybe<ResolversTypes["SentRequestResponse"]>,
    ParentType,
    ContextType,
    Partial<MutationDeleteFriendRequestArgs>
  >
  deleteMessage?: Resolver<
    Maybe<ResolversTypes["Response"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteMessageArgs, "messageId">
  >
  deletePost?: Resolver<
    ResolversTypes["GetPostByUserIdResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostArgs, "id">
  >
  likePost?: Resolver<
    ResolversTypes["GetPostByUserIdResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationLikePostArgs, "postId">
  >
  logout?: Resolver<Maybe<ResolversTypes["Response"]>, ParentType, ContextType>
  newJwt?: Resolver<Maybe<ResolversTypes["Response"]>, ParentType, ContextType>
  resetPassword?: Resolver<
    Maybe<ResolversTypes["Response"]>,
    ParentType,
    ContextType,
    RequireFields<MutationResetPasswordArgs, "newPassword">
  >
  sendMessage?: Resolver<
    Maybe<ResolversTypes["SendMessageResponse"]>,
    ParentType,
    ContextType,
    Partial<MutationSendMessageArgs>
  >
  sendRequest?: Resolver<
    Maybe<ResolversTypes["SentRequestResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSendRequestArgs, "toID">
  >
  signIn?: Resolver<
    Maybe<ResolversTypes["SignInMutation"]>,
    ParentType,
    ContextType,
    Partial<MutationSignInArgs>
  >
  signUp?: Resolver<
    Maybe<ResolversTypes["Response"]>,
    ParentType,
    ContextType,
    Partial<MutationSignUpArgs>
  >
  unlikePost?: Resolver<
    ResolversTypes["GetPostByUserIdResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationUnlikePostArgs, "postId">
  >
  updateUser?: Resolver<
    Maybe<ResolversTypes["Response"]>,
    ParentType,
    ContextType
  >
  uploadPost?: Resolver<
    ResolversTypes["UploadAPostResponse"],
    ParentType,
    ContextType,
    Partial<MutationUploadPostArgs>
  >
  uploadProfile?: Resolver<
    Maybe<ResolversTypes["Response"]>,
    ParentType,
    ContextType
  >
}

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Post"] = ResolversParentTypes["Post"]
> = {
  _count?: Resolver<Maybe<ResolversTypes["_count"]>, ParentType, ContextType>
  author?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  hasLiked?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  images?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PostLikeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PostLike"] = ResolversParentTypes["PostLike"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  post?: Resolver<ResolversTypes["Post"], ParentType, ContextType>
  postId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  allUsers?: Resolver<
    Maybe<ResolversTypes["AllUsersResponse"]>,
    ParentType,
    ContextType,
    Partial<QueryAllUsersArgs>
  >
  getAllPosts?: Resolver<
    Maybe<ResolversTypes["GetAllPostsQuery"]>,
    ParentType,
    ContextType,
    Partial<QueryGetAllPostsArgs>
  >
  getFriendRequest?: Resolver<
    Maybe<ResolversTypes["FriendRequestResponse"]>,
    ParentType,
    ContextType
  >
  getMessagesByUsers?: Resolver<
    Maybe<ResolversTypes["GetMessageByUserResponse"]>,
    ParentType,
    ContextType,
    Partial<QueryGetMessagesByUsersArgs>
  >
  getPostByUserId?: Resolver<
    Maybe<ResolversTypes["GetPostByUserIdResponse"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetPostByUserIdArgs, "userId">
  >
  getSentFriendRequest?: Resolver<
    Maybe<ResolversTypes["FriendRequestResponse"]>,
    ParentType,
    ContextType,
    Partial<QueryGetSentFriendRequestArgs>
  >
  loggedInUser?: Resolver<
    Maybe<ResolversTypes["LogInResponse"]>,
    ParentType,
    ContextType
  >
}

export type ResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Response"] = ResolversParentTypes["Response"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  status?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SendMessageResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SendMessageResponse"] = ResolversParentTypes["SendMessageResponse"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  result?: Resolver<Maybe<ResolversTypes["Message"]>, ParentType, ContextType>
  status?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SentRequestResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SentRequestResponse"] = ResolversParentTypes["SentRequestResponse"]
> = {
  data?: Resolver<
    Maybe<ResolversTypes["FriendRequest"]>,
    ParentType,
    ContextType
  >
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  status?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SessionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Session"] = ResolversParentTypes["Session"]
> = {
  associate?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  timeStamps?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  userEmail?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SignInMutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SignInMutation"] = ResolversParentTypes["SignInMutation"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  status?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  token?: Resolver<Maybe<ResolversTypes["Token"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = {
  newPost?: SubscriptionResolver<
    Maybe<ResolversTypes["Post"]>,
    "newPost",
    ParentType,
    ContextType
  >
}

export type TokenResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Token"] = ResolversParentTypes["Token"]
> = {
  accessJWT?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UploadAPostResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UploadAPostResponse"] = ResolversParentTypes["UploadAPostResponse"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  result?: Resolver<Maybe<ResolversTypes["Post"]>, ParentType, ContextType>
  status?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  bio?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  chatRoom?: Resolver<
    Array<ResolversTypes["ChatRoom"]>,
    ParentType,
    ContextType
  >
  comment?: Resolver<Array<ResolversTypes["Comment"]>, ParentType, ContextType>
  coverPicture?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  fName?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  friendRequests?: Resolver<
    Array<ResolversTypes["FriendRequests"]>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  isActive?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  lName?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  likedComments?: Resolver<
    Array<ResolversTypes["CommentLikes"]>,
    ParentType,
    ContextType
  >
  likedPosts?: Resolver<
    Array<ResolversTypes["PostLike"]>,
    ParentType,
    ContextType
  >
  messages?: Resolver<Array<ResolversTypes["Message"]>, ParentType, ContextType>
  password?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  post?: Resolver<Array<ResolversTypes["Post"]>, ParentType, ContextType>
  profile?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  sentRequests?: Resolver<
    Array<ResolversTypes["FriendRequests"]>,
    ParentType,
    ContextType
  >
  session?: Resolver<Array<ResolversTypes["Session"]>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type _CountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["_count"] = ResolversParentTypes["_count"]
> = {
  comments?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  likes?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  AllUsersResponse?: AllUsersResponseResolvers<ContextType>
  ChatRoom?: ChatRoomResolvers<ContextType>
  Comment?: CommentResolvers<ContextType>
  CommentLikes?: CommentLikesResolvers<ContextType>
  CommentReply?: CommentReplyResolvers<ContextType>
  Friend?: FriendResolvers<ContextType>
  FriendRequest?: FriendRequestResolvers<ContextType>
  FriendRequestResponse?: FriendRequestResponseResolvers<ContextType>
  FriendRequests?: FriendRequestsResolvers<ContextType>
  GetAllPostsQuery?: GetAllPostsQueryResolvers<ContextType>
  GetMessageByUserResponse?: GetMessageByUserResponseResolvers<ContextType>
  GetPostByUserIdResponse?: GetPostByUserIdResponseResolvers<ContextType>
  LogInResponse?: LogInResponseResolvers<ContextType>
  Message?: MessageResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  PostLike?: PostLikeResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Response?: ResponseResolvers<ContextType>
  SendMessageResponse?: SendMessageResponseResolvers<ContextType>
  SentRequestResponse?: SentRequestResponseResolvers<ContextType>
  Session?: SessionResolvers<ContextType>
  SignInMutation?: SignInMutationResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Token?: TokenResolvers<ContextType>
  UploadAPostResponse?: UploadAPostResponseResolvers<ContextType>
  User?: UserResolvers<ContextType>
  _count?: _CountResolvers<ContextType>
}

export const SignInDocument = `
    mutation SignIn($input: SignInMutationVariables) {
  signIn(input: $input) {
    status
    message
    token {
      accessJWT
    }
  }
}
    `
export const GetAllPostsDocument = `
    query GetAllPosts($args: GetAllPostsQueryVariables) {
  getAllPosts(args: $args) {
    status
    message
    totalNumberOfPosts
    posts {
      id
      title
      content
      hasLiked
      _count {
        likes
        comments
      }
      author {
        fName
        email
        id
        lName
        isActive
        profile
      }
      createdAt
      updatedAt
      images
    }
  }
}
    `

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: build => ({
    SignIn: build.mutation<SignInMutation, SignInMutationVariables | void>({
      query: variables => ({ document: SignInDocument, variables }),
    }),
    GetAllPosts: build.query<
      GetAllPostsQuery,
      GetAllPostsQueryVariables | void
    >({
      query: variables => ({ document: GetAllPostsDocument, variables }),
    }),
  }),
})

export { injectedRtkApi as api }
export const {
  useSignInMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
} = injectedRtkApi
