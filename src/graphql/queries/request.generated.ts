import * as Types from '../../types/types';

import { baseApiWithGraphql } from '../baseApi';
export type SendFriendRequestMutationVariables = Types.Exact<{
  toId: Types.Scalars['String']['input'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', data?: { __typename?: 'SentRequestResponse', status: boolean, message: string, data?: { __typename?: 'FriendRequest', status: Types.Status, toId: string, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } } | null } | null };

export type GetFriendRequestQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetFriendRequestQuery = { __typename?: 'Query', data?: { __typename?: 'FriendRequestResponse', status: boolean, message: string, count?: number | null, data?: Array<{ __typename?: 'FriendRequest', status: Types.Status, toId: string, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } }> | null } | null };

export type GetSentFriendRequestQueryVariables = Types.Exact<{
  page: Types.Scalars['Int']['input'];
  take: Types.Scalars['Int']['input'];
  search: Types.Scalars['String']['input'];
}>;


export type GetSentFriendRequestQuery = { __typename?: 'Query', getSentFriendRequest?: { __typename?: 'FriendRequestResponse', status: boolean, message: string, count?: number | null, data?: Array<{ __typename?: 'FriendRequest', status: Types.Status, toId: string, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } }> | null } | null };


export const SendFriendRequestDocument = `
    mutation SendFriendRequest($toId: String!) {
  data: sendRequest(toId: $toId) {
    status
    message
    data {
      status
      toId
      from {
        id
        fName
        lName
        email
        profile
        isActive
      }
      to {
        id
        fName
        lName
        email
        profile
        isActive
      }
    }
  }
}
    `;
export const GetFriendRequestDocument = `
    query GetFriendRequest {
  data: getFriendRequest {
    status
    message
    data {
      from {
        id
        fName
        lName
        email
        profile
        isActive
      }
      to {
        id
        fName
        lName
        email
        profile
        isActive
      }
      status
      toId
    }
    count
  }
}
    `;
export const GetSentFriendRequestDocument = `
    query GetSentFriendRequest($page: Int!, $take: Int!, $search: String!) {
  getSentFriendRequest(page: $page, take: $take, search: $search) {
    status
    message
    data {
      from {
        id
        fName
        lName
        email
        profile
        isActive
      }
      to {
        id
        fName
        lName
        email
        profile
        isActive
      }
      status
      toId
    }
    count
  }
}
    `;

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: (build) => ({
    SendFriendRequest: build.mutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>({
      query: (variables) => ({ document: SendFriendRequestDocument, variables })
    }),
    GetFriendRequest: build.query<GetFriendRequestQuery, GetFriendRequestQueryVariables | void>({
      query: (variables) => ({ document: GetFriendRequestDocument, variables })
    }),
    GetSentFriendRequest: build.query<GetSentFriendRequestQuery, GetSentFriendRequestQueryVariables>({
      query: (variables) => ({ document: GetSentFriendRequestDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSendFriendRequestMutation, useGetFriendRequestQuery, useLazyGetFriendRequestQuery, useGetSentFriendRequestQuery, useLazyGetSentFriendRequestQuery } = injectedRtkApi;

