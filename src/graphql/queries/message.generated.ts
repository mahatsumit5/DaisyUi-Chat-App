import * as Types from '../../types/types';

import { baseApiWithGraphql } from '../baseApi';
export type SendMessageMutationVariables = Types.Exact<{
  content: Types.Scalars['String']['input'];
  author: Types.Scalars['String']['input'];
  roomId: Types.Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'SendMessageResponse', status: boolean, message: string, data?: { __typename?: 'Message', id: string, content: string, createdAt: string, isSeen: boolean, chatRoomId: string, authorId: string, groupChatId?: string | null, author: { __typename?: 'User', email: string, fName: string, lName: string, isActive: boolean, profile?: string | null } } | null } | null };

export type GetMessagesQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.MessageByRoomIdParams>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessagesByRoomId?: { __typename?: 'GetMessageByRoomResponse', status: boolean, message: string, _count?: number | null, data: Array<{ __typename?: 'Message', id: string, content: string, createdAt: string, isSeen: boolean, chatRoomId: string, authorId: string, groupChatId?: string | null, author: { __typename?: 'User', id: string, email: string, fName: string, lName: string, isActive: boolean, profile?: string | null, bio?: string | null, coverPicture?: string | null } }> } | null };


export const SendMessageDocument = `
    mutation SendMessage($content: String!, $author: String!, $roomId: String!) {
  sendMessage(content: $content, author: $author, roomId: $roomId) {
    status
    message
    data {
      id
      content
      createdAt
      isSeen
      chatRoomId
      author {
        email
        fName
        lName
        isActive
        profile
      }
      authorId
      groupChatId
    }
  }
}
    `;
export const GetMessagesDocument = `
    query GetMessages($input: MessageByRoomIdParams) {
  getMessagesByRoomId(input: $input) {
    status
    message
    data {
      id
      content
      createdAt
      isSeen
      chatRoomId
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
      groupChatId
    }
    _count
  }
}
    `;

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: (build) => ({
    SendMessage: build.mutation<SendMessageMutation, SendMessageMutationVariables>({
      query: (variables) => ({ document: SendMessageDocument, variables })
    }),
    GetMessages: build.query<GetMessagesQuery, GetMessagesQueryVariables | void>({
      query: (variables) => ({ document: GetMessagesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSendMessageMutation, useGetMessagesQuery, useLazyGetMessagesQuery } = injectedRtkApi;

