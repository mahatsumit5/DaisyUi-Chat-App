import * as Types from '../../types/types';

import { baseApiWithGraphql } from '../baseApi';
export type GetAllPostsQueryVariables = Types.Exact<{
  args?: Types.InputMaybe<Types.GetAllPostArgs>;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', data?: { __typename?: 'GetAllPostResponse', status: boolean, message: string, totalNumberOfPosts?: number | null, posts?: Array<{ __typename?: 'Post', id: string, title: string, content: string, createdAt: string, updatedAt: string, images: Array<string>, hasLiked: boolean, author?: { __typename?: 'User', id: string, email: string, fName: string, lName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null } | null, _count?: { __typename?: '_count', comments: number, likes: number } | null }> | null } | null };

export type CreatePostMutationVariables = Types.Exact<{
  body?: Types.InputMaybe<Types.PostInput>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', uploadPost: { __typename?: 'UploadAPostResponse', status: boolean, message: string, result?: { __typename?: 'Post', id: string, title: string, content: string, createdAt: string, updatedAt: string, images: Array<string>, author?: { __typename?: 'User', id: string, email: string, fName: string, lName: string, profile?: string | null, coverPicture?: string | null, bio?: string | null, isActive: boolean } | null, _count?: { __typename?: '_count', comments: number } | null } | null } };

export type UpdatePostMutationVariables = Types.Exact<{
  updatePostId: Types.Scalars['String']['input'];
  title?: Types.InputMaybe<Types.Scalars['String']['input']>;
  content?: Types.InputMaybe<Types.Scalars['String']['input']>;
  images?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', data?: { __typename?: 'UploadAPostResponse', status: boolean, message: string, result?: { __typename?: 'Post', id: string, images: Array<string>, title: string, updatedAt: string, createdAt: string, content: string } | null } | null };

export type LikePostMutationVariables = Types.Exact<{
  postId: Types.Scalars['String']['input'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'GetLikedPostResponse', status: boolean, message: string, likedPost?: string | null } };

export type UnlikePostMutationVariables = Types.Exact<{
  postId: Types.Scalars['String']['input'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlikePost: { __typename?: 'UnlikePostResponse', status: boolean, message: string, data?: string | null } };


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
    `;
export const CreatePostDocument = `
    mutation CreatePost($body: PostInput) {
  uploadPost(body: $body) {
    status
    message
    result {
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
        profile
        coverPicture
        bio
        isActive
      }
      _count {
        comments
      }
    }
  }
}
    `;
export const UpdatePostDocument = `
    mutation UpdatePost($updatePostId: String!, $title: String, $content: String, $images: [String!]) {
  data: updatePost(
    id: $updatePostId
    title: $title
    content: $content
    images: $images
  ) {
    status
    result {
      id
      images
      title
      updatedAt
      createdAt
      content
    }
    message
  }
}
    `;
export const LikePostDocument = `
    mutation LikePost($postId: String!) {
  likePost(postId: $postId) {
    status
    message
    likedPost
  }
}
    `;
export const UnlikePostDocument = `
    mutation UnlikePost($postId: String!) {
  unlikePost(postId: $postId) {
    status
    message
    data
  }
}
    `;

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: (build) => ({
    GetAllPosts: build.query<GetAllPostsQuery, GetAllPostsQueryVariables | void>({
      query: (variables) => ({ document: GetAllPostsDocument, variables })
    }),
    CreatePost: build.mutation<CreatePostMutation, CreatePostMutationVariables | void>({
      query: (variables) => ({ document: CreatePostDocument, variables })
    }),
    UpdatePost: build.mutation<UpdatePostMutation, UpdatePostMutationVariables>({
      query: (variables) => ({ document: UpdatePostDocument, variables })
    }),
    LikePost: build.mutation<LikePostMutation, LikePostMutationVariables>({
      query: (variables) => ({ document: LikePostDocument, variables })
    }),
    UnlikePost: build.mutation<UnlikePostMutation, UnlikePostMutationVariables>({
      query: (variables) => ({ document: UnlikePostDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetAllPostsQuery, useLazyGetAllPostsQuery, useCreatePostMutation, useUpdatePostMutation, useLikePostMutation, useUnlikePostMutation } = injectedRtkApi;

