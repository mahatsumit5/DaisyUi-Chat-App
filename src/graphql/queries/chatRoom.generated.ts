import * as Types from '../../types/types';

import { baseApiWithGraphql } from '../baseApi';
export type GetAllChatRoomsQueryVariables = Types.Exact<{
  contains?: Types.InputMaybe<Types.Scalars['String']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetAllChatRoomsQuery = { __typename?: 'Query', getAllChatRooms: { __typename?: 'GetChatRoomResponse', status: boolean, message: string, data: Array<{ __typename?: 'ChatRoom', id: string, userId: string, fName: string, lName: string, profile?: string | null, email: string, isActive: boolean, lastMessage?: string | null, isLastMessageSeen: boolean, lastmessageAuthor: string, unSeenMessageCount: number }> } };


export const GetAllChatRoomsDocument = `
    query GetAllChatRooms($contains: String, $take: Int, $page: Int) {
  getAllChatRooms(contains: $contains, take: $take, page: $page) {
    status
    message
    data {
      id
      userId
      fName
      lName
      profile
      email
      isActive
      lastMessage
      isLastMessageSeen
      lastmessageAuthor
      unSeenMessageCount
    }
  }
}
    `;

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: (build) => ({
    GetAllChatRooms: build.query<GetAllChatRoomsQuery, GetAllChatRoomsQueryVariables | void>({
      query: (variables) => ({ document: GetAllChatRoomsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetAllChatRoomsQuery, useLazyGetAllChatRoomsQuery } = injectedRtkApi;

