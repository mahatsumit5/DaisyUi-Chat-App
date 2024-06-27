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
import { toggleLoader } from "../reducer/loader.slice";
import { toggleToast } from "../reducer/toast.slice";
import { setUser } from "../reducer/user.slice";

const userApi = createApi({
  reducerPath: "UserApi",
  tagTypes: ["Users", "CurrentUser"],

  baseQuery: fetchBaseQuery({
    baseUrl: userApiUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        sessionStorage.getItem("accessJWT") as string
      );
      return headers;
    },
    timeout: 10000, // request timeouts after 10 seconds
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IAllUsersResponse, IGetAllUsersParams | null>({
      query: (params) =>
        `all-users?order=${params?.order}&&page=${params?.page}&&take=${params?.take}&&search=${params?.search}`,

      providesTags: ["Users"],
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved }
      ) => {
        try {
          await cacheDataLoaded;
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
      },
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
          const { data } = await queryFulfilled;
          if (data.status) {
            sessionStorage.setItem("accessJWT", data.token.accessJWT); ///active for 5mins
            localStorage.setItem("refreshJWT", data.token.refreshJWT); //active for 30days
            const result = await dispatch(
              userApi.endpoints.getLoggedInUser.initiate()
            );
            console.log(result);
          }
          dispatch(toggleLoader({ isLoading: false }));

          dispatch(
            toggleToast({
              isOpen: true,
              content: {
                id: Math.ceil(Math.random() * 10000000),
                message: "Welcome back",
                type: "info",
              },
            })
          );
        } catch (error) {
          console.log(error);

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
          dispatch(setUser(data as IUser));
          sessionStorage.setItem("id", data.id);
          if (data.id) {
            socket.connect();
          }
          dispatch(toggleLoader({ isLoading: false }));
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }));
        }
      },

      providesTags: ["CurrentUser"],
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

          dispatch(
            toggleToast({
              isOpen: true,
              content: {
                id: Math.ceil(Math.random() * 10000000),
                message: "Thank you signing up.",
                type: "info",
              },
            })
          );
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
    changePassword: builder.mutation<
      { status: boolean; message: string },
      { password: string }
    >({
      query: (data) => ({ url: "reset-password", method: "PUT", body: data }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            toggleToast({
              isOpen: true,
              content: {
                id: Math.ceil(Math.random() * 10000000),
                message: "Your password has been changed",
                type: "success",
              },
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    uploadImage: builder.mutation<unknown, File>({
      query: (image) => {
        const formData = new FormData();
        formData.append("profile", image);
        return {
          url: "upload-profile",
          body: formData,
          method: "PUT",
        };
      },
      invalidatesTags: ["CurrentUser"],
    }),
  }),
});

export { userApi };
