import * as Types from '../../types/types';

import { baseApiWithGraphql } from '../baseApi';
export type GetCommentsQueryVariables = Types.Exact<{
  postId: Types.Scalars['String']['input'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: { __typename?: 'GetCommentResponse', status: boolean, message: string, count?: number | null, data: Array<{ __typename?: 'PostComment', id: string, content: string, postId: string, authorId: string, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: string, email: string, fName: string, lName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null }, likes: Array<{ __typename?: 'CommentLikes', commentId: string, userId: string, user: { __typename?: 'User', id: string, email: string, fName: string, lName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null } }>, replies: Array<{ __typename?: 'CommentReply', replyId: string, reply: { __typename?: 'PostComment', id: string, content: string, postId: string, authorId: string, createdAt: string, updatedAt: string } }> }> } };

export type DeleteCommentMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'DeleteCommentResponse', status: boolean, message: string, data?: { __typename?: 'PostComment', id: string, content: string, postId: string, authorId: string, createdAt: string, updatedAt: string } | null } };

export type CreateCommentMutationVariables = Types.Exact<{
  content: Types.Scalars['String']['input'];
  postId: Types.Scalars['String']['input'];
  userId: Types.Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'PostCommentResponse', status: boolean, message: string, data?: { __typename?: 'PostComment', id: string, content: string, postId: string, authorId: string, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: string, email: string, fName: string, lName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null }, likes: Array<{ __typename?: 'CommentLikes', commentId: string, userId: string, user: { __typename?: 'User', id: string, email: string, fName: string, lName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null } }>, replies: Array<{ __typename?: 'CommentReply', replyId: string, reply: { __typename?: 'PostComment', id: string, content: string, postId: string, authorId: string, createdAt: string, updatedAt: string } }> } | null } };


export const GetCommentsDocument = `
    query GetComments($postId: String!) {
  getComments(postId: $postId) {
    status
    message
    count
    data {
      id
      content
      postId
      authorId
      createdAt
      updatedAt
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
      likes {
        commentId
        userId
        user {
          id
          email
          fName
          lName
          isActive
          profile
          bio
          coverPicture
        }
      }
      replies {
        reply {
          id
          content
          postId
          authorId
          createdAt
          updatedAt
        }
        replyId
      }
    }
  }
}
    `;
export const DeleteCommentDocument = `
    mutation DeleteComment($id: String!) {
  deleteComment(id: $id) {
    status
    message
    data {
      id
      content
      postId
      authorId
      createdAt
      updatedAt
    }
  }
}
    `;
export const CreateCommentDocument = `
    mutation CreateComment($content: String!, $postId: String!, $userId: String!) {
  createComment(content: $content, postId: $postId, userId: $userId) {
    status
    message
    data {
      id
      content
      postId
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
      authorId
      likes {
        commentId
        userId
        user {
          id
          email
          fName
          lName
          isActive
          profile
          bio
          coverPicture
        }
      }
      createdAt
      updatedAt
      replies {
        reply {
          id
          content
          postId
          authorId
          createdAt
          updatedAt
        }
        replyId
      }
    }
  }
}
    `;

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: (build) => ({
    GetComments: build.query<GetCommentsQuery, GetCommentsQueryVariables>({
      query: (variables) => ({ document: GetCommentsDocument, variables })
    }),
    DeleteComment: build.mutation<DeleteCommentMutation, DeleteCommentMutationVariables>({
      query: (variables) => ({ document: DeleteCommentDocument, variables })
    }),
    CreateComment: build.mutation<CreateCommentMutation, CreateCommentMutationVariables>({
      query: (variables) => ({ document: CreateCommentDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetCommentsQuery, useLazyGetCommentsQuery, useDeleteCommentMutation, useCreateCommentMutation } = injectedRtkApi;

