import * as Types from '../../types/types';

import { baseApiWithGraphql } from '../baseApi';
export type LoggedInUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', data?: { __typename?: 'LoggedInUserResponse', message: string, status: boolean, data?: { __typename?: 'User', bio?: string | null, coverPicture?: string | null, email: string, id: string, fName: string, lName: string, isActive: boolean, profile?: string | null } | null } | null };

export type LogoutMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', data?: { __typename?: 'Response', status: boolean, message: string } | null };


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
    message
    status
  }
}
    `;
export const LogoutDocument = `
    mutation Logout($email: String!) {
  data: logout(email: $email) {
    status
    message
  }
}
    `;

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: (build) => ({
    LoggedInUser: build.query<LoggedInUserQuery, LoggedInUserQueryVariables | void>({
      query: (variables) => ({ document: LoggedInUserDocument, variables })
    }),
    Logout: build.mutation<LogoutMutation, LogoutMutationVariables>({
      query: (variables) => ({ document: LogoutDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useLoggedInUserQuery, useLazyLoggedInUserQuery, useLogoutMutation } = injectedRtkApi;

