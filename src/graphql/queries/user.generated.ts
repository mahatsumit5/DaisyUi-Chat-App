import * as Types from '../../types/types';

import { baseApiWithGraphql } from '../baseApi';
export type LoggedInUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', data?: { __typename?: 'LoggedInUserResponse', message: string, status: boolean, data?: { __typename?: 'User', bio?: string | null, coverPicture?: string | null, email: string, id: string, fName: string, lName: string, isActive: boolean, profile?: string | null } | null } | null };

export type LogoutMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', data?: { __typename?: 'Response', status: boolean, message: string } | null };

export type GetAllUsersQueryVariables = Types.Exact<{
  params?: Types.InputMaybe<Types.AllUser>;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', allUsers?: { __typename?: 'AllUsersResponse', status: boolean, message: string, totalUsers?: number | null, data?: Array<{ __typename?: 'Friend', id: string, fName: string, lName: string, email: string, profile?: string | null, isActive: boolean }> | null } | null };

export type UpdateUserMutationVariables = Types.Exact<{
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
  profile?: Types.InputMaybe<Types.Scalars['String']['input']>;
  coverPicture?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', data?: { __typename?: 'UpdateUserResponse', status: boolean, message: string, data?: { __typename?: 'User', id: string, email: string, fName: string, lName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null } | null } | null };


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
export const GetAllUsersDocument = `
    query GetAllUsers($params: allUser) {
  allUsers(params: $params) {
    status
    message
    data {
      id
      fName
      lName
      email
      profile
      isActive
    }
    totalUsers
  }
}
    `;
export const UpdateUserDocument = `
    mutation UpdateUser($password: String, $profile: String, $coverPicture: String) {
  data: updateUser(
    password: $password
    profile: $profile
    coverPicture: $coverPicture
  ) {
    status
    message
    data {
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
    GetAllUsers: build.query<GetAllUsersQuery, GetAllUsersQueryVariables | void>({
      query: (variables) => ({ document: GetAllUsersDocument, variables })
    }),
    UpdateUser: build.mutation<UpdateUserMutation, UpdateUserMutationVariables | void>({
      query: (variables) => ({ document: UpdateUserDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useLoggedInUserQuery, useLazyLoggedInUserQuery, useLogoutMutation, useGetAllUsersQuery, useLazyGetAllUsersQuery, useUpdateUserMutation } = injectedRtkApi;

