import * as Types from "../types/types.ts"

import { baseApiWithGraphql } from "./baseApi"
export type GetAllPostsQueryVariables = Types.Exact<{
  args?: Types.InputMaybe<Types.GetAllPostArgs>
}>

export type GetAllPostsQuery = {
  __typename?: "Query"
  data?: {
    __typename?: "GetAllPostsQuery"
    status: boolean
    message: string
    totalNumberOfPosts?: number | null
    posts?: Array<{
      __typename?: "Post"
      id: string
      title: string
      content: string
      createdAt: string
      updatedAt: string
      images: Array<string>
      hasLiked: boolean
      author?: {
        __typename?: "User"
        id: string
        email: string
        fName: string
        lName: string
        isActive: boolean
        profile?: string | null
        bio?: string | null
        coverPicture?: string | null
      } | null
      _count?: { __typename?: "_count"; comments: number; likes: number } | null
    }> | null
  } | null
}

export type SignUpMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.SignUpUserParams>
}>

export type SignUpMutation = {
  __typename?: "Mutation"
  data?: {
    __typename?: "SignUpResponse"
    data?: {
      __typename?: "User"
      lName: string
      fName: string
      isActive: boolean
      profile?: string | null
      bio?: string | null
      coverPicture?: string | null
      email: string
      id: string
    } | null
    response?: {
      __typename?: "Response"
      message: string
      status: boolean
    } | null
  } | null
}

export type SignInMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.SignInParams>
}>

export type SignInMutation = {
  __typename?: "Mutation"
  data?: {
    __typename?: "SignInMutation"
    data?: { __typename?: "Token"; accessJWT: string } | null
    response?: {
      __typename?: "Response"
      message: string
      status: boolean
    } | null
  } | null
}

export type LoggedInUserQueryVariables = Types.Exact<{ [key: string]: never }>

export type LoggedInUserQuery = {
  __typename?: "Query"
  data?: {
    __typename?: "LoggedInUserResponse"
    data?: {
      __typename?: "User"
      bio?: string | null
      coverPicture?: string | null
      email: string
      id: string
      fName: string
      lName: string
      isActive: boolean
      profile?: string | null
    } | null
    response?: {
      __typename?: "Response"
      message: string
      status: boolean
    } | null
  } | null
}

export const GetAllPostsDocument = `
    query GetAllPosts($args: GetAllPostArgs) {
  data: getAllPosts(args: $args) {
    status
    message
    posts {
      id
      title
      content
      createdAt
      updatedAt
      images
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
      hasLiked
      _count {
        comments
        likes
      }
    }
    totalNumberOfPosts
  }
}
    `
export const SignUpDocument = `
    mutation SignUp($input: SignUpUserParams) {
  data: signUp(input: $input) {
    data {
      lName
      fName
      isActive
      profile
      bio
      coverPicture
      email
      id
    }
    response {
      message
      status
    }
  }
}
    `
export const SignInDocument = `
    mutation SignIn($input: SignInParams) {
  data: signIn(input: $input) {
    data {
      accessJWT
    }
    response {
      message
      status
    }
  }
}
    `
export const LoggedInUserDocument = `
    query LoggedInUser {
  data: loggedInUser {
    data {
      bio
      coverPicture
      email
      id
      fName
      lName
      isActive
      profile
    }
    response {
      message
      status
    }
  }
}
    `

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: build => ({
    GetAllPosts: build.query<
      Types.GetAllPostsQuery,
      Types.GetAllPostsQueryVariables | void
    >({
      query: variables => ({ document: GetAllPostsDocument, variables }),
    }),
    SignUp: build.mutation<
      Types.SignUpMutation,
      Types.SignUpMutationVariables | void
    >({
      query: variables => ({ document: SignUpDocument, variables }),
    }),
    SignIn: build.mutation<
      Types.SignInMutation,
      Types.SignInMutationVariables | void
    >({
      query: variables => ({ document: SignInDocument, variables }),
    }),
    LoggedInUser: build.query<
      Types.LoggedInUserQuery,
      Types.LoggedInUserQueryVariables | void
    >({
      query: variables => ({ document: LoggedInUserDocument, variables }),
    }),
  }),
})

export { injectedRtkApi as api }
export const {
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useSignUpMutation,
  useSignInMutation,
  useLoggedInUserQuery,
  useLazyLoggedInUserQuery,
} = injectedRtkApi
