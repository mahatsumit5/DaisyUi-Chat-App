import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApiUrl } from "./serverUrl";
import {
  IAllUsersResponse,
  IGetAllUsersParams,
  IGetNewAcessJWTResponse,
  ILogin,
  IResponse,
  ISignUpParams,
  IUser,
} from "../../types";
import { socket } from "../reducer/socket.slice";
import { toggleLoader } from "../loader.slice";

const userApi = createApi({
  reducerPath: "UserApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: userApiUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        sessionStorage.getItem("accessJWT") as string
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IAllUsersResponse, IGetAllUsersParams>({
      query: ({ order, page, take, search }) =>
        `all-users?order=${order}&&page=${page}&&take=${take}&&search=${search}`,
      transformResponse: (response: {
        status: boolean;
        data: IUser[];
        totalUsers: number;
      }) => response,

      providesTags: ["Users"],
    }),
    logoutUser: builder.mutation<{ status: boolean }, void>({
      query: () => ({ url: "logout", method: "POST" }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(
            toggleLoader({ isLoading: true, content: "Please Wait..." })
          );
          await queryFulfilled;
          dispatch(toggleLoader({ isLoading: false }));
          socket.emit("disconnect");
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }));
        }
      },
    }),
    login: builder.mutation<ILogin, { email: string; password: string }>({
      query: (data) => ({
        url: "sign-in",
        method: "POST",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: ILogin) {
        return baseQueryReturnValue;
      },

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(
            toggleLoader({ isLoading: true, content: "Please Wait..." })
          );
          await queryFulfilled;
          dispatch(toggleLoader({ isLoading: false }));
          socket.emit("disconnect");
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }));
        }
      },

      invalidatesTags: ["Users"],
    }),

    getLoggedInUser: builder.query<IUser, void>({
      query: () => "",
      transformResponse: (response: { status: boolean; data: IUser }) =>
        response.data,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(
            toggleLoader({ isLoading: true, content: "Please Wait..." })
          );
          const { data } = await queryFulfilled;
          sessionStorage.setItem("email", data.email);
          if (data.id) {
            socket.connect();
          }
          dispatch(toggleLoader({ isLoading: false }));
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }));

          console.log(error);
        }
      },
    }),
    signUpUser: builder.mutation<IResponse, ISignUpParams>({
      query: (data) => ({
        url: "sign-up",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(
            toggleLoader({ isLoading: true, content: "Please Wait..." })
          );
          await queryFulfilled;
          dispatch(toggleLoader({ isLoading: false }));
          socket.emit("disconnect");
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }));
        }
      },
    }),
    getNewAccessJWT: builder.mutation<IGetNewAcessJWTResponse, void>({
      query: () => ({
        url: "new-accessJWT",
        headers: {
          refreshJWT: localStorage.getItem("refreshJWT") as string,
        },

        method: "PATCH",
      }),
    }),
  }),
});

export { userApi };
