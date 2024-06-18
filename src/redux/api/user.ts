import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApiUrl } from "./serverUrl";
import { ILogin, IResponse, ISignUpParams, IUser } from "../../types";
import { socket } from "../reducer/socket.slice";

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
    getAllUsers: builder.query<IUser[], void>({
      query: () => "all-users",
      transformResponse: (response: { status: boolean; data: IUser[] }) =>
        response.data,

      providesTags: ["Users"],
    }),
    logoutUser: builder.mutation<{ status: boolean }, void>({
      query: () => ({ url: "logout", method: "POST" }),
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

      invalidatesTags: ["Users"],
    }),

    getLoggedInUser: builder.query<IUser, void>({
      query: () => "",
      transformResponse: (response: { status: boolean; data: IUser }) =>
        response.data,
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          console.info(arg);
          const { data } = await queryFulfilled;
          sessionStorage.setItem("email", data.email);
          if (data.id) {
            socket.connect();
          }
        } catch (error) {
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
    }),
    getNewAccessJWT: builder.mutation<
      { status: boolean; data: string; message: string },
      void
    >({
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
