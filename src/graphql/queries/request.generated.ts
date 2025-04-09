import * as Types from '../../types/types';

import { baseApiWithGraphql } from '../baseApi';
export type SendFriendRequestMutationVariables = Types.Exact<{
  toId: Types.Scalars['String']['input'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendRequest?: { __typename?: 'SentRequestResponse', status: boolean, message: string, data?: { __typename?: 'FriendRequest', status: Types.Status, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } } | null } | null };

export type GetFriendRequestQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetFriendRequestQuery = { __typename?: 'Query', data?: { __typename?: 'FriendRequestResponse', status: boolean, message: string, count: number, data: Array<{ __typename?: 'FriendRequest', status: Types.Status, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } }> } | null };

export type GetSentFriendRequestQueryVariables = Types.Exact<{
  page: Types.Scalars['Int']['input'];
  take: Types.Scalars['Int']['input'];
  search: Types.Scalars['String']['input'];
}>;


export type GetSentFriendRequestQuery = { __typename?: 'Query', getSentFriendRequest?: { __typename?: 'FriendRequestResponse', status: boolean, message: string, count: number, data: Array<{ __typename?: 'FriendRequest', status: Types.Status, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } }> } | null };

export type DeleteFriendReqMutationVariables = Types.Exact<{
  fromId: Types.Scalars['String']['input'];
  toId: Types.Scalars['String']['input'];
}>;


export type DeleteFriendReqMutation = { __typename?: 'Mutation', deleteFriendRequest?: { __typename?: 'SentRequestResponse', status: boolean, message: string, data?: { __typename?: 'FriendRequest', status: Types.Status, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } } | null } | null };

export type AcceptFriendRequestMutationVariables = Types.Exact<{
  fromId: Types.Scalars['String']['input'];
  toId: Types.Scalars['String']['input'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest?: { __typename?: 'CreateChatRoomResponse', status: boolean, message: string, data?: string | null } | null };


export const SendFriendRequestDocument = `
    mutation SendFriendRequest($toId: String!) {
  sendRequest(toId: $toId) {
    status
    message
    data {
      status
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
    }
    count
  }
}
    `;
export const DeleteFriendReqDocument = `
    mutation DeleteFriendReq($fromId: String!, $toId: String!) {
  deleteFriendRequest(fromId: $fromId, toId: $toId) {
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
    }
  }
}
    `;
export const AcceptFriendRequestDocument = `
    mutation AcceptFriendRequest($fromId: String!, $toId: String!) {
  acceptFriendRequest(fromId: $fromId, toId: $toId) {
    status
    message
    data
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
    DeleteFriendReq: build.mutation<DeleteFriendReqMutation, DeleteFriendReqMutationVariables>({
      query: (variables) => ({ document: DeleteFriendReqDocument, variables })
    }),
    AcceptFriendRequest: build.mutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>({
      query: (variables) => ({ document: AcceptFriendRequestDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSendFriendRequestMutation, useGetFriendRequestQuery, useLazyGetFriendRequestQuery, useGetSentFriendRequestQuery, useLazyGetSentFriendRequestQuery, useDeleteFriendReqMutation, useAcceptFriendRequestMutation } = injectedRtkApi;

