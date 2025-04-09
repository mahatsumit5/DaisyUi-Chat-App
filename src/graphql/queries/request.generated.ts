import * as Types from '../../types/types';

import { baseApiWithGraphql } from '../baseApi';
export type SendFriendRequestMutationVariables = Types.Exact<{
  toId: Types.Scalars['String']['input'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', data?: { __typename?: 'SentRequestResponse', status: boolean, message: string, data?: { __typename?: 'FriendRequest', status: Types.Status, toId: string, from: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }, to: { __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean } } | null } | null };


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

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: (build) => ({
    SendFriendRequest: build.mutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>({
      query: (variables) => ({ document: SendFriendRequestDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSendFriendRequestMutation } = injectedRtkApi;

