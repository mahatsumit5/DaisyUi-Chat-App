import * as Types from '../../types/types';

import { baseApiWithGraphql } from '../baseApi';
export type GetAllPostsQueryVariables = Types.Exact<{
  args?: Types.InputMaybe<Types.GetAllPostArgs>;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', data?: { __typename?: 'GetAllPostsQuery', status: boolean, message: string, totalNumberOfPosts?: number | null, posts?: Array<{ __typename?: 'Post', id: string, title: string, content: string, createdAt: string, updatedAt: string, images: Array<string>, hasLiked: boolean, author?: { __typename?: 'User', id: string, email: string, fName: string, lName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null } | null, _count?: { __typename?: '_count', comments: number, likes: number } | null }> | null } | null };


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

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: (build) => ({
    GetAllPosts: build.query<GetAllPostsQuery, GetAllPostsQueryVariables | void>({
      query: (variables) => ({ document: GetAllPostsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetAllPostsQuery, useLazyGetAllPostsQuery } = injectedRtkApi;

