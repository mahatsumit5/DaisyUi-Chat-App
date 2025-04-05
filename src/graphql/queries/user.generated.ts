import * as Types from '../../types/types';

import { baseApiWithGraphql } from '../baseApi';
export type SignUpMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.SignUpUserParams>;
}>;


export type SignUpMutation = { __typename?: 'Mutation', data?: { __typename?: 'SignUpResponse', message: string, status: boolean, data?: { __typename?: 'User', lName: string, fName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null, email: string, id: string } | null } | null };

export type SignInMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.SignInParams>;
}>;


export type SignInMutation = { __typename?: 'Mutation', data?: { __typename?: 'SignInResponse', message: string, status: boolean, data?: { __typename?: 'Token', accessJWT: string } | null } | null };

export type LoggedInUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', data?: { __typename?: 'LoggedInUserResponse', message: string, status: boolean, data?: { __typename?: 'User', bio?: string | null, coverPicture?: string | null, email: string, id: string, fName: string, lName: string, isActive: boolean, profile?: string | null } | null } | null };

export type LogoutMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', data?: { __typename?: 'Response', status: boolean, message: string } | null };


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
    message
    status
  }
}
    `;
export const SignInDocument = `
    mutation SignIn($input: SignInParams) {
  data: signIn(input: $input) {
    data {
      accessJWT
    }
    message
    status
  }
}
    `;
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
    SignUp: build.mutation<SignUpMutation, SignUpMutationVariables | void>({
      query: (variables) => ({ document: SignUpDocument, variables })
    }),
    SignIn: build.mutation<SignInMutation, SignInMutationVariables | void>({
      query: (variables) => ({ document: SignInDocument, variables })
    }),
    LoggedInUser: build.query<LoggedInUserQuery, LoggedInUserQueryVariables | void>({
      query: (variables) => ({ document: LoggedInUserDocument, variables })
    }),
    Logout: build.mutation<LogoutMutation, LogoutMutationVariables>({
      query: (variables) => ({ document: LogoutDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSignUpMutation, useSignInMutation, useLoggedInUserQuery, useLazyLoggedInUserQuery, useLogoutMutation } = injectedRtkApi;

